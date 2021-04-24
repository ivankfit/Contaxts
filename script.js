const tablekey = 'cms-table';

let clearBtn=document.getElementById('clearBtn');
clearBtn.addEventListener('click', () =>{
localStorage.removeItem(tablekey);
});

let cmsTable;
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

let refreshDOMTable =() => {
    let cmsTableKeys = Object.keys(cmsTable); // thi will create an array of  contact names and keeps populating the table
    let tableContainer = document.getElementById('cmsTableContainer')
    let oldTableBody = document.getElementById('tableBody'); 
    tableContainer.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';

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
        

    }

}