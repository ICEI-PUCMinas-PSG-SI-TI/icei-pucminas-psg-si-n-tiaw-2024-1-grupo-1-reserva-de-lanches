const defaultProfile  = {
    id: 1,
    name: 'Gabriel',
    shift: 'Noite',
    email: 'gabriel.matos@example.com',
    phone: '(31) 1234-1111',
    person_id: '123456'
}; 

// Função para carregar o perfil do Local Storage
function loadProfile() {
    let storedProfile = JSON.parse(localStorage.getItem('userList'));

    if (storedProfile == null || Object.keys(storedProfile).length === 0) {
        storedProfile = defaultProfile;
        localStorage.setItem('userList', JSON.stringify(defaultProfile));
    }

    let usuar = JSON.parse(sessionStorage.getItem('loggedInUser'));
    for(let i = 0; i < storedProfile.length; i++) {
        if(storedProfile[i].email == usuar.email) {
            document.querySelector('#profile-form').setAttribute("data-id", i);
            fillForm(storedProfile[i]);
        }
    }

    let html_ul = ""
    // if(storedProfile[0])
}

// Função para preencher o formulário com os dados do perfil
function fillForm(profile) {
    document.getElementById('name').value = profile.firstName;
    document.getElementById('shift').value = profile.lastName;
    document.getElementById('email').value = profile.email;
    //document.getElementById('phone').value = profile.phone;
    document.getElementById('person-id').value = profile.enrollment;
}

// Função para editar o perfil
function editProfile() {
    document.getElementById('name').removeAttribute('readonly');
    document.getElementById('shift').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    //document.getElementById('phone').removeAttribute('readonly');

    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline-block';
}

function saveProfile() {
    let indice = parseInt(document.querySelector('#profile-form').getAttribute("data-id"));
    let Profile = JSON.parse(localStorage.getItem('userList'));
    
    Profile[indice].email = document.getElementById('email').value;
    Profile[indice].enrollment = document.getElementById('person-id').value;
    Profile[indice].firstName =  document.getElementById('name').value;
    Profile[indice].lastName = document.getElementById('shift').value;
  
    // Atualiza os dados do usuário logado, a lista de usuários e
    // o histórico de pedidos caso o e-mail tenha sido alterado
    let usuar = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (usuar.email != Profile[indice].email) {
        updateOrderHistory(usuar.email, Profile[indice].email);
        updateLoggedUser(Profile[indice].email);
    }

    document.querySelectorAll('input').forEach(input => {
        input.setAttribute('readonly', true);
    });
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
    localStorage.setItem('userList', JSON.stringify(Profile));
    alert('Perfil salvo com sucesso!');
}

function updateOrderHistory(oldEmail, newEmail) {
    pedidos = JSON.parse(localStorage.getItem('pedidos'));
    if (pedidos) {
        pedidos.forEach( p => {
            if (p.email == oldEmail) {
                p.email = newEmail;
            }
        });
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
}

function updateLoggedUser(email) {
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    loggedInUser.email = email;
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
}

// document.querySelectorAll('input').forEach(input => {
//     input.addEventListener('change', saveProfile);
// });

function logOff() {
    sessionStorage.removeItem('loggedInUser');
    window.open("../../index.html", '_self');
}

window.addEventListener('load', loadProfile);