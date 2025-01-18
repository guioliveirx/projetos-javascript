let validator = {
    handleSubmit: (event) => {
        // Previne ações padrões de um evento
        event.preventDefault();
        let send = false;
        let inputs = form.querySelectorAll('input');

        inputs.forEach((input) => {
            // Recebe o status da validação do input
            let check = validator.checkInput(input);

            // Caso haja erro, não envia o formulário
            if(!check) {
                send = false;
                // Exiba o motivo
            }
        })


        if(send) {
            form.submit();
        }

    }
}

let form = document.querySelector('.form-validator');

form.addEventListener('submit', validator.handleSubmit);
