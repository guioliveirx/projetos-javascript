const divForm = document.querySelectorAll(".group-form");

let formValidator = {
    handleSubmit: (event) => {
        // Previne ações padrões de um evento
        event.preventDefault();

        let sendForm = false;
        let inputs = form.querySelectorAll('.form-input');

        // Limpa todos os inputs que atenderam aos requisitos
        formValidator.clearError(inputs);

        // Recebe o status da validação do input
        sendForm = formValidator.checkInput(inputs);

        if (sendForm) {
            form.submit();
        }
    },
    checkInput: (inputs) => {
        let errorMessage = "";
        let validation = true

        inputs.forEach((input) => {
            const formRules = input.getAttribute("data-rules");
            if (formRules != null) {
                const rules = formRules.split("|");
                rules.forEach((rule) => {
                    const valueRule = rule.split("=");
                    switch (valueRule[0]) {
                        case "required":
                            if (input.value === "") {
                                errorMessage = "O campo não pode ser vazio.";
                                formValidator.showError(input, errorMessage);
                                return validation = false;
                            }
                            break;
                        case "min":
                            if (input.value.length < valueRule[1]) {
                                errorMessage = `O campo deve conter no mínimo ${valueRule[1]} caracteres.`;
                                formValidator.showError(input, errorMessage);
                                return validation = false;
                            }
                            break;
                        case "upperCase":
                            const upperCaseCount = (input.value.match(/[A-Z]/g) || []).length;
                            if (upperCaseCount === 0) {
                                errorMessage = `O campo deve conter no mínimo 1 caractere maiúsculo.`;
                                formValidator.showError(input, errorMessage);
                                return validation = false;
                            }
                            break;
                        case "email":
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(input.value != "" && !regex.test(input.value.toLowerCase())) {
                                errorMessage = `O E-mail não é válido.`;
                                formValidator.showError(input, errorMessage);
                                return validation = false;
                            }
                            break;
                    }
                });
                return validation;
            }
        })
        return validation;
    },
    showError: (input, error) => {
        const message = document.createElement("p");
        message.classList.add("error");
        message.textContent = error;
        input.parentElement.insertBefore(message, input.ElementSibling);
        input.classList.add("form-error");
    },
    clearError: (inputs) => {
        inputs.forEach((input) => {
            input.classList.remove("form-error");
        })

        let errorElements = document.querySelectorAll(".error");
        errorElements.forEach((error) => {
            error.remove();
        })
    }
}

let form = document.querySelector('.form-validator');

form.addEventListener('submit', formValidator.handleSubmit);
