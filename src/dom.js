document.addEventListener("DOMContentLoaded", function() {
    const registrationform = document.getElementById("registrationform");
    const registrationbody = document.getElementById("registrationbody");
    let editMode = false; 
    let editRow = null; 
    let idCounter = 1; 

    registrationform.addEventListener("submit", function(event) {
        event.preventDefault();

        const Name = document.getElementById('Name').value.trim();
        const email = document.getElementById('Email').value.trim(); 
        const role = document.getElementById('role').value;

        if (Name === "") {
            alert("Please add a name");
            return;
        }

        if (email === "") {
            alert("Please add an email");
            return;
        }

      
        if (editMode) {
      
            editRow.querySelector('td:first-child').textContent = Name;
            editRow.querySelector('td:nth-child(2)').textContent = email;
            editRow.querySelector('td:nth-child(3)').textContent = role;
          
            editMode = false;
            editRow = null;
        } else {
        
            register(Name, email, role, idCounter++);
        }

    
        document.getElementById('Name').value = "";
        document.getElementById('Email').value = "";
    });

    registrationbody.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('remove') || target.parentElement.classList.contains('remove')) {
            target.closest('tr').remove();
        } else if (target.classList.contains('edit') || target.parentElement.classList.contains('edit')) {
            const currentRow = target.closest('tr');
            document.getElementById('Name').value = currentRow.querySelector('td:nth-child(2)').textContent;
            document.getElementById('Email').value = currentRow.querySelector('td:nth-child(3)').textContent;
            document.getElementById('role').value = currentRow.querySelector('td:nth-child(4)').textContent;
            editMode = true;
            editRow = currentRow;
        }
    });

    function register(Name, email, role, id) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${id}</td>
            <td>${Name}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td class="action-column">
                <button class="remove"><i class="fas fa-trash"></i></button>
                <button class="edit"><i class="fas fa-pen-to-square"></i></button>
            </td>
        `;
    
        registrationbody.appendChild(newRow);
    }
});