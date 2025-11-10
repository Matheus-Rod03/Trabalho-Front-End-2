(function(){
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function qs(selector, root=document){ return root.querySelector(selector) }
  function setError(id, msg){ const el = qs(id); if(el) el.textContent = msg || '' }

  const form = qs('#studentForm');
  if(form){
    const stored = sessionStorage.getItem('formData');
    if(stored){
      try{
        const data = JSON.parse(stored);
        qs('#nome').value = data.nome || '';
        qs('#sobrenome').value = data.sobrenome || '';
        qs('#email').value = data.email || '';
        qs('#idade').value = data.idade || '';
      }catch(e){ console.warn('session data corrupt') }
    }

    function validateAll(){
      let valid = true;
      // nome
      const nome = qs('#nome').value.trim();
      if(!nome){ setError('#err-nome','Nome não pode ficar vazio'); valid=false }
      else if(nome.length < 3 || nome.length > 50){ setError('#err-nome','Nome deve ter entre 3 e 50 caracteres'); valid=false }
      else setError('#err-nome','');

      // sobrenome
      const sobrenome = qs('#sobrenome').value.trim();
      if(!sobrenome){ setError('#err-sobrenome','Sobrenome não pode ficar vazio'); valid=false }
      else if(sobrenome.length < 3 || sobrenome.length > 50){ setError('#err-sobrenome','Sobrenome deve ter entre 3 e 50 caracteres'); valid=false }
      else setError('#err-sobrenome','');

      // email
      const email = qs('#email').value.trim();
      if(!email){ setError('#err-email','Email não pode ficar vazio'); valid=false }
      else if(!emailRegex.test(email.toLowerCase())){ setError('#err-email','Email inválido'); valid=false }
      else setError('#err-email','');

      // idade
      const idadeRaw = qs('#idade').value;
      const idade = Number(idadeRaw);
      if(!idadeRaw){ setError('#err-idade','Idade é obrigatória'); valid=false }
      else if(!Number.isInteger(idade) || idade <= 0 || idade >= 120){ setError('#err-idade','Idade deve ser inteiro entre 1 e 119'); valid=false }
      else setError('#err-idade','');

      return valid;
    }

  
    ['#nome','#sobrenome','#email','#idade'].forEach(sel=>{
      const el = qs(sel);
      if(!el) return;
      el.addEventListener('input', ()=> validateAll());
    });

    qs('#btnCancel').addEventListener('click', ()=> {
      window.location.href = 'index.html';
    });

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(validateAll()){
      
        const data = {
          nome: qs('#nome').value.trim(),
          sobrenome: qs('#sobrenome').value.trim(),
          email: qs('#email').value.trim(),
          idade: Number(qs('#idade').value)
        };
        
        sessionStorage.setItem('formData', JSON.stringify(data));
        window.location.href = 'confirmation.html';
      } else {
        
        const firstErr = document.querySelector('.error:not(:empty)');
        if(firstErr){
          const input = firstErr.previousElementSibling;
          if(input && input.focus) input.focus();
        }
      }
    });
  }

  const preview = qs('#preview');
  const btnEdit = qs('#btnEdit');
  const btnConfirm = qs('#btnConfirm');

  if(preview){
    const stored = sessionStorage.getItem('formData');
    if(!stored){
      preview.innerHTML = '<p class="muted">Nenhum dado encontrado. <a href="form.html">Voltar ao formulário</a></p>';
    }else{
      const data = JSON.parse(stored);
      preview.innerHTML = `
        <div class="preview-list">
          <div class="preview-item"><strong>Nome</strong><span>${escapeHtml(data.nome)}</span></div>
          <div class="preview-item"><strong>Sobrenome</strong><span>${escapeHtml(data.sobrenome)}</span></div>
          <div class="preview-item"><strong>Email</strong><span>${escapeHtml(data.email)}</span></div>
          <div class="preview-item"><strong>Idade</strong><span>${String(data.idade)}</span></div>
        </div>
      `;
    }

    if(btnEdit){
      btnEdit.addEventListener('click', ()=>{
        window.location.href = 'form.html';
      });
    }

    if(btnConfirm){
      btnConfirm.addEventListener('click', ()=>{
        const stored2 = sessionStorage.getItem('formData');
        if(!stored2) return alert('Sem dados para salvar.');
        const obj = JSON.parse(stored2);

        const blob = new Blob([JSON.stringify(obj, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        localStorage.setItem('lastSavedForm', JSON.stringify(obj));
  
        sessionStorage.removeItem('formData');

        window.location.href = 'index.html';
      });
    }
  }

  function escapeHtml(str){
    if(typeof str !== 'string') return str;
    return str.replace(/[&<>"]/g, function(tag){ const chars = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}; return chars[tag] || tag; });
  }

})();