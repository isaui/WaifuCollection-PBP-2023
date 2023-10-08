
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function calculateRank(strength, speed, intelligence, potential, endurance) {
    // Menghitung nilai total stats
   var totalStats = (strength + speed + intelligence + potential + endurance) / 5;

   // Menentukan kisaran rank berdasarkan total stats
   if (totalStats >= 90) {
       return 'S';
   } else if (totalStats >= 80) {
       return 'A';
   } else if (totalStats >= 70) {
       return 'B';
   } else if (totalStats >= 60) {
       return 'C';
   } else if (totalStats >= 50) {
       return 'D';
   } else {
       return 'E';
   }
}

const changeAmountAJAX = async (id, quantity) => {
    const loadingElement = document.getElementById("loadingOverlay");
    const csrftoken = getCookie('csrftoken');
    const formData = new FormData();
    formData.append('waifu_card_id', id);
    formData.append('quantity', quantity);
    try {
        loadingElement.style.display = "flex";
        const res = await fetch('/main/changeAmount/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: formData
        })
        console.log(res)
        await getData()
    } catch (error) {
        console.log(error)
    }
    loadingElement.style.display = "none";
}
const deleteCardAJAX = async (id) =>{
    const loadingElement = document.getElementById("loadingOverlay");
    const csrftoken = getCookie('csrftoken');
    const formData = new FormData();
    formData.append('waifu_card_id', id);
    try {
        loadingElement.style.display = "flex";
        const res = await fetch('/main/deleteCard/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: formData
        });
        console.log(res)
        await getData()
    } catch (error) {
        console.log(error)
    }
    loadingElement.style.display = "none";
}

const resetForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("strength").value = 50; 
    document.getElementById("speed").value = 50;
    document.getElementById("intelligence").value = 50;
    document.getElementById("potential").value = 50;
    document.getElementById("endurance").value = 50;
    document.getElementById("description").value = "";
    document.getElementById("weight").value = ""; 
    document.getElementById("height").value = "";
    document.getElementById('strength-value').textContent = "50"; 
    document.getElementById('speed-value').textContent = "50"; 
    document.getElementById('intelligence-value').textContent = "50"; 
    document.getElementById('potential-value').textContent = "50"; 
    document.getElementById('endurance-value').textContent = "50"; 
}
const submitForm = async () =>{
    const loadingElement = document.getElementById("loadingOverlay");
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const strength = document.getElementById("strength").value;
    const speed = document.getElementById("speed").value;
    const intelligence = document.getElementById("intelligence").value;
    const potential = document.getElementById("potential").value;
    const endurance = document.getElementById("endurance").value;
    const description = document.getElementById("description").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if (name.trim() === "") {
        alert("Nama tidak boleh kosong");
        nameInput.focus();
        return false;
    }
    if (description.trim() === "") {
        alert("Deskripsi tidak boleh kosong");
        descriptionInput.focus();
        return false;
    }
    if (amount <= 0 || isNaN(amount)) {
        alert("Jumlah harus bilangan bulat lebih dari 0 dan tidak boleh kosong");
        amountInput.focus();
        return false;
    }
    if (weight <= 0 || isNaN(weight)) {
        alert("Berat harus bilangan dan tidak boleh kosong");
        weightInput.focus();
        return false;
    }
    if (height <= 0 || isNaN(height)) {
        alert("Jumlah harus bilangan dan tidak boleh kosong");
        heightInput.focus();
        return false;
    }
    const data = {
        name: name,
        description: description,
        amount: amount,
        weight: weight,
        height: height,
        strength: strength,
        speed: speed,
        intelligence: intelligence,
        potential: potential,
        endurance: endurance
    };
    try {
        loadingElement.style.display = 'flex';
        const res = await fetch('/main/create_ajax/', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            
        })
        await getData()
        resetForm()

    } catch (error) {
        console.log(error)
    }
    loadingElement.style.display = 'none';
    closeForm()

}

function updateOutput(value, elementId) {
    // Mengambil elemen output
    var outputElement = document.getElementById(elementId);
    
    // Mengubah teks pada elemen output sesuai dengan nilai input
    outputElement.textContent = value;
    
}

const openForm = () =>{
    const formContainerElement = document.getElementById('form-container');
    const openFormButtonElement = document.getElementById('open-form-button');
    const logoutButtonElement = document.getElementById('logout-button');
    formContainerElement.style.display = 'flex';
    openFormButtonElement.style.display = 'none';
    logoutButtonElement.style.display = 'none';
}

const closeForm = ()=> {
    const formContainerElement = document.getElementById('form-container');
    const openFormButtonElement = document.getElementById('open-form-button');
    const logoutButtonElement = document.getElementById('logout-button');
    formContainerElement.style.display = 'none';
    openFormButtonElement.style.display = 'flex';
    logoutButtonElement.style.display = 'flex';
}

const getData = async () => {
    const containerElement = document.getElementById("collection-container");
    const totalCardElement = document.getElementById("total-of-cards");
   
    try {
        
        const res = await fetch("/main/home_ajax/");
        const {username, waifus, lastLogin, total} = await res.json();
        totalCardElement.innerHTML = `Terdapat <span  class="text-[#00A8FF]">${total} kartu waifu </span>`
        if(waifus.length == 0){
            containerElement.innerHTML = `<div class="flex w-full justify-center text-sm md:text-base lg:text-lg text-white font-bold h-full items-center">
            <h1> Belum ada waifu. Silahkan menambahkan</h1>
        </div>`
        }
        else{
            let innerHTML = `<div class="mb-4  mx-auto gap-4 grid justify-center grid-cols-1    `
            if(waifus.length == 1){
                innerHTML += `md:grid-cols-1 lg:grid-cols-1">`
            }
            else if(waifus.length == 2){
                innerHTML += `md:grid-cols-2 lg:grid-cols-2">`
            }
            else{
                innerHTML +=  `md:grid-cols-2 lg:grid-cols-3">`
            }
            waifus.forEach((waifu, index)=>{
                innerHTML+=`<div class="max-w-[24rem] bg-opacity-60 min-w-[21rem] relative w-[21rem] md:w-[24rem] px-4 mx-auto rounded-lg shadow-lg mt-2 overflow-hidden  `;
                if(index == waifus.length - 1){
                    innerHTML+= `bg-slate-700">`;
                }
                else{
                    innerHTML+= `bg-slate-950">`;
                }

                innerHTML+= `<!-- Card Header -->
                <div class="relative z-10 flex justify-between items-center w-full">
                    <div class="px-4 pt-4 flex flex-col items-center">
                        <h1 class="font-bold ml-auto text-lg text-white">Waifu <span class="text-[#00A8FF]">Card</span></h1>
                        <div class="border-b- mt-2 border-[#00A8FF] w-full mx-2"></div>
                    </div>
                    <div class="pt-4 flex items-center justify-end space-x-2">
                        <button onclick="changeAmountAJAX(${waifu.id}, -1)" class="fas fa-minus w-8 h-8" style="color: white;">
                        </button>
                        <button onclick="changeAmountAJAX(${waifu.id}, 1)" class="fas fa-plus w-8 h-8" style="color: white;">
                        </button>
                        <button onclick="deleteCardAJAX(${waifu.id})" class="fas fa-trash w-8 h-8" style="color: red;">
                        </button>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="relative z-10 p-4">
                    <!-- Waifu Name & Amount -->
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-lg font-semibold text-[#00A8FF]">${ waifu.name }</h2>
                        <div class="ml-2 text-white px-3 py-1 text-sm rounded-md bg-teal-950 hover:bg-teal-900">
                            <h1>${ waifu.amount }</h1>
                        </div>
                    </div>
                    <!-- Waifu Description -->
                    <p class="text-white text-sm" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${ waifu.description }</p>
                    <!-- Waifu Stats -->
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-[#00A8FF]">STATS</h3>
                        <div class="flex flex-col">
                            <div class="flex flex-col justify-center">
                                <label for="strength" class="text-white text-sm">Strength</label>
                                <div class="flex justify-between items-center">
                                    <div class="bg-white rounded-full h-[0.5rem] w-[90%]">
                                        <div class="bg-${waifu.strength <= 25 ? 'green-600' : waifu.strength <= 50 ? 'yellow-600': waifu.strength <= 75 ? 'orange-600' : 'red-600'}
                                         h-full rounded-full" style="width: ${ waifu.strength }%;"></div>
                                    </div>
                                    <span class="ml-2 text-white">${ waifu.strength }</span>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="speed" class="text-white text-sm">Speed</label>
                                <div class="flex justify-between items-center">
                                    <div class="bg-white rounded-full h-[0.5rem] w-[90%]">
                                        <div class="bg-${waifu.speed <= 25 ? 'green-600' : waifu.speed <= 50 ? 'yellow-600': waifu.speed <= 75 ? 'orange-600' : 'red-600'}
                                         h-full rounded-full" style="width: ${ waifu.speed }%;"></div>
                                    </div>
                                    <span class="ml-2 text-white">${ waifu.speed }</span>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="potential" class="text-white text-sm">Potential</label>
                                <div class="flex justify-between items-center">
                                    <div class="bg-white rounded-full h-[0.5rem] w-[90%]">
                                        <div class="bg-${waifu.potential <= 25 ? 'green-600' : waifu.potential <= 50 ? 'yellow-600': waifu.potential <= 75 ? 'orange-600' : 'red-600'}
                                         h-full rounded-full" style="width: ${ waifu.potential }%;"></div>
                                    </div>
                                <span class="ml-2 text-white">${ waifu.potential }</span>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="intelligence" class="text-white text-sm">Intelligence</label>
                                <div class="flex justify-between items-center">
                                    <div class="bg-white rounded-full h-[0.5rem] w-[90%]">
                                        <div class="bg-${waifu.intelligence <= 25 ? 'green-600' : waifu.intelligence <= 50 ? 'yellow-600': waifu.intelligence <= 75 ? 'orange-600' : 'red-600'}
                                         h-full rounded-full" style="width: ${ waifu.intelligence }%;"></div>
                                    </div>
                                    <span class="ml-2 text-white">${ waifu.intelligence }</span>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="endurance" class="text-white text-sm">Endurance</label>
                                <div class="flex justify-between items-center">
                                    <div class="bg-white rounded-full h-[0.5rem] w-[90%]">
                                        <div class="bg-${waifu.endurance <= 25 ? 'green-600' : waifu.endurance <= 50 ? 'yellow-600': waifu.endurance <= 75 ? 'orange-600' : 'red-600'}
                                         h-full rounded-full" style="width: ${ waifu.endurance }%;"></div>
                                    </div>
                                    <span class="ml-2 text-white">${ waifu.endurance }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Waifu Physical Attributes -->
                    <div class="mt-4 flex flex-col">
                        <h3 class="text-lg font-semibold text-[#00A8FF]">Physical Attributes</h3>
                        <div class="flex justify-between items-center text-white">
                            <h1 class="text-sm">Height</h1>
                            <div class=" px-2 py-1 bg-slate-900 rounded-md text-sm">${ waifu.height } cm</div>
                        </div>
                        <div class="flex justify-between items-center text-white space-y-3">
                            <h1 class="text-sm">Weight</h1>
                            <div class=" px-2 py-1 bg-slate-900 rounded-md text-sm">${ waifu.weight } kg</div>
                        </div>
                    </div>
                </div>
                <div id="card-rank-${waifu.id}" class="z-0   w-full absolute font-bold text-[#00A8FF] opacity-30 inset-0 flex items-center justify-center text-[24rem]">
                    ${calculateRank(waifu.strength, waifu.speed, waifu.intelligence, waifu.potential,
                        waifu.endurance)}
                </div>
            </div>`
            });
            innerHTML+= `</div>`;
            containerElement.innerHTML = innerHTML;
        }

    } catch (error) {
        console.log(error)
    }
    
}
window.addEventListener('DOMContentLoaded', async ()=> {
    const loadingElement = document.getElementById("loadingOverlay");
    loadingElement.style.display = 'flex';
    await getData();
    loadingElement.style.display = 'none';
})