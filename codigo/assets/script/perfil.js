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

    fillForm(storedProfile[0]);

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
    let Profile = JSON.parse(localStorage.getItem('userList'))[0];
    const updatedProfile =[ {
        firstName: document.getElementById('name').value,
        lastName: document.getElementById('shift').value,
        email: document.getElementById('email').value,
        password: Profile.password,
        enrollment: document.getElementById('person-id').value
    }];

  
    localStorage.setItem('userList', JSON.stringify(updatedProfile));

    alert('Perfil salvo com sucesso!');

    document.querySelectorAll('input').forEach(input => {
        input.setAttribute('readonly', true);
    });
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
}


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', saveProfile);
});

function logOff() {
    sessionStorage.removeItem('loggedInUser');
    window.open("../../index.html", '_self');
}

window.addEventListener('load', loadProfile);