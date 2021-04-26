const tablekey = 'cms-table';

let clearBtn=document.getElementById('clearBtn');
clearBtn.addEventListener('click', () =>{
localStorage.removeItem(tablekey);
});

let cmsTable;
//dictionary
let cmsTableDemo = {
'Ivan Tweheyo': {
    'phone':  '077-712-2972',
    'address': '124 Naguru, Kampala, Ug, 256'
},
'Cryce Ahebwa': {
    'phone':  '070-512-2982',
    'address': '987 Kigali, Rwanda, Ug, 255'
},
};
//function to disable Name while editing the form
let enableDisableNameInput = (option) =>{
    let newPersonName = document.getElementById('newPersonName');

    if(option === 'enable')
        newPersonName.disabled = false;
    else if (option == 'disable')
        newPersonName.disabled = true;
}

let refreshDOMTable =() => {
    cmsTable = cmsTableDemo;
    let cmsTableKeys = Object.keys(cmsTable); // thi will create an array of  contact names and keeps populating the table
    let tableContainer = document.getElementById('cmsTableContainer')
    let oldTableBody = document.getElementById('tableBody'); 
    tableContainer.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for(let i =0; i < cmsTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        //assign each element a class

        currentRow.className = 'cms-table-row';
        currentNameCol.className = 'cms-table-column cms-name';
        currentPhoneCol.className = 'cms-table-column cms-phone';
        currentAddressCol.className = 'cms-table-column cms-address';
        currentEditBtn.className = 'cms-table-column cms-edit';
        currentDeleteBtn.className = 'cms-table-column cms-delete';

        currentNameCol.innerHTML = cmsTableKeys[i]; //we start to interate through the array(contact names) starting with index 0
        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
        currentAddressCol.innerHTML = cmsTable[cmsTableKeys[i]].address;

        currentDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';

        //putting elements in the current row
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        //append the child row to table body
        newTableBody.appendChild(currentRow);
    }
    //define a function to activate the modal to add new contact
    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonAddress = document.getElementById('newPersonAddress');
        //set fields to an empty string
        newPersonName.value ='';
        newPersonPhone.value ='';
        newPersonAddress.value ='';

        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');

        newPersonModal.className =`${option}-modal`;
        backdrop.className = `${option}-modal`;

    }
    //reference the table
    let addNewEntryBtn = document.getElementById('cmsAddNewEntry');
    let editBtns = document.getElementsByClassName('cms-edit');
    let deleteBtns = document.getElementsByClassName('cms-delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

    //add event listeners to the button clicks
    newPersonSubmitBtn.addEventListener('click', ()=>{
        let newPersonName = document.getElementsById('newPersonName').value.trim();
        let newPersonPhone = document.getElementsById('newPersonPhone').value.trim();
        let newPersonAddress = document.getElementsById('newPersonAddress').value.trim();

        if(newPersonName === '')
            newPersonName.className = 'input-err';
        else
            newPersonName.className ='';

        if(newPersonPhone === '')
            newPersonPhone.className = 'input-err'
        else
            newPersonPhone.className ='';

        if(newPersonAddress === '')
            newPersonAddress.className ='input-err';
        else
            newPersonAddress.className ='';

        if(newPersonName !=='' && newPersonPhone !=='' && newPersonAddress !==''){
            let newPerson = {};
            cmsTable[newPersonName] = {
                'phone': newPersonPhone,
                'address': newPersonAddress
            }
            localStorage.setItem(tablekey, JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }
        
    });
    newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');
    });
    addNewEntryBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('enable');
    });

    for(let i=0; i<editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) =>{
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];

            enableDisableNewUserModal('enable');

            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonAddress = document.getElementById('newPersonAddress');
            newPersonName.value = nameToEdit;
            newPersonPhone.value = personToEdit.phone;
            newPersonAddress.value = personToEdit.address;
            enableDisableNameInput('disable');
        });
    }

    for(let i=0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) =>{
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
            if(isSure)
                deleteUserFromTable(nameToDelete);

        });
    } 
let deleteUserFromTable = (userName) => {
    let tempTable ={};
    let cmsTableKeys = Object.keys(cmsTable);
    for (let i=0; i < cmsTableKeys.length; i++){
        if(userName !== cmsTableKeys[i]){
            tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]];
        }
    }
    cmsTable = tempTable;
    localStorage.setItem(tablekey, JSON.stringify(cmsTable));
    refreshDOMTable();
}

let init = () => {

    if(localStorage.getItem(tablekey)){
        cmsTable = JSON.parse(localStorage.getItem(tablekey));
    }else{
        cmsTable = cmsTableDemo;
        localStorage.setItem(tablekey, JSON.stringify(cmsTable));
    }
    refreshDOMTable();
}
init();

}