function salvarArquivo() {
    const texto = document.getElementById('editor').value;
    let nome = document.getElementById('fileName').value || 'arquivo';

    // Function to normalize accented characters and "ç"
    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c');
    }

    // Suggest the first line of the text as the file name if the field is empty
    if (!document.getElementById('fileName').value) {
        const primeiraLinha = texto.split('\n')[0].trim();
        if (primeiraLinha) {
            nome = normalizeString(primeiraLinha).replace(/[^a-zA-Z0-9-_]/g, '_'); // Remove invalid characters
        }
    }

    // Validation of the file name
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

    // Visual feedback
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    setTimeout(() => feedback.style.display = 'none', 3000);
}

// Atualiza a contagem de caracteres
document.getElementById('editor').addEventListener('input', function() {
    const charCount = document.getElementById('charCount');
    charCount.textContent = `Caracteres: ${this.value.length}`;
});
