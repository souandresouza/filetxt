function salvarArquivo() {
    const texto = document.getElementById('editor').value;
    const nome = document.getElementById('fileName').value || 'arquivo';

    // Validação do nome do arquivo
    if (/[^a-zA-Z0-9-_]/.test(nome)) {
        alert("Nome do arquivo contém caracteres inválidos!");
        return;
    }

    if(texto.length > 35 * 1024 * 1024) {
        alert("Limite de 35MB ultrapassado!");
        return;
    }

    const blob = new Blob([texto], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, `${nome}.txt`);

    // Feedback visual
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    setTimeout(() => feedback.style.display = 'none', 3000);
}