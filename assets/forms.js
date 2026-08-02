document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form[data-web3form]').forEach(function (form) {
    var btn = form.querySelector('button[type="submit"], .submit-btn');
    var resultEl = form.querySelector('.form-result');
    if (!resultEl) {
      resultEl = document.createElement('div');
      resultEl.className = 'form-result';
      form.appendChild(resultEl);
    }
    var btnDefaultText = btn ? btn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot spam check
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) return;

      var formData = new FormData(form);
      var object = {};
      formData.forEach(function (value, key) {
        if (key === 'av_needs') {
          if (!object[key]) object[key] = [];
          if (value) object[key].push(value);
        } else {
          object[key] = value;
        }
      });
      if (object.av_needs) object.av_needs = object.av_needs.join(', ');

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending\u2026';
      }
      resultEl.textContent = '';
      resultEl.className = 'form-result';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(object)
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            resultEl.textContent = form.getAttribute('data-success') || "Thanks \u2014 we've got it and will follow up within one business day.";
            resultEl.className = 'form-result success';
          } else {
            resultEl.textContent = 'Something went wrong. Please email us directly at info@ynvents.com.';
            resultEl.className = 'form-result error';
          }
        })
        .catch(function () {
          resultEl.textContent = 'Something went wrong. Please email us directly at info@ynvents.com.';
          resultEl.className = 'form-result error';
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = btnDefaultText;
          }
        });
    });
  });
});
