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
    let storedProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (storedProfile == null || Object.keys(storedProfile).length === 0) {
        storedProfile = defaultProfile;
        localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }

    fillForm(storedProfile);
}

// Função para preencher o formulário com os dados do perfil
function fillForm(profile) {
    document.getElementById('name').value = profile.name;
    document.getElementById('shift').value = profile.shift;
    document.getElementById('email').value = profile.email;
    document.getElementById('phone').value = profile.phone;
    document.getElementById('person-id').value = profile.person_id;
}

// Função para editar o perfil
function editProfile() {
    document.getElementById('name').removeAttribute('readonly');
    document.getElementById('shift').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('phone').removeAttribute('readonly');

    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline-block';
}


function saveProfile() {
    const updatedProfile = {
        name: document.getElementById('name').value,
        shift: document.getElementById('shift').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        person_id: document.getElementById('person-id').value
    };

  
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

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


window.addEventListener('load', loadProfile);