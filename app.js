const spinner = document.querySelector('#spinner');
const searchInput = document.querySelector('.data-search input');
const notFoundText = document.querySelector('#nodata');
const tableData = document.querySelector('.tableBody');
const bodyOverlay = document.querySelector('.body-overlay');

const searchFun = (searchVal, apidata) => {
    const searchmatchData = apidata.filter((e) => {
        if (e.id.toLowerCase().includes(searchVal.toLowerCase())) {
            return e;
        }
    })

    showData(searchmatchData);

}
const loadData = async () => {
    const getData = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false');
    const jsonData = await getData.json();
    showData(jsonData);

    searchInput.addEventListener('keyup', (e) => {
        const searchVal = e.target.value;
        searchFun(searchVal, jsonData);
    })

}


const showData = (data) => {
    if (data.length === 0) {
        notFoundText.classList.remove('hidden');
        tableData.textContent = "";
    } else {
        tableData.textContent = "";
        notFoundText.classList.add('hidden');
        spinner.classList.add('hidden');


        data.forEach(val => {
            const allprofit = val.price_change_percentage_24h.toFixed(2);

            let dataItem = `<tr  onclick="moreInformation('${val.id}')" class="shadow-sm shadow-gray-700 hover:bg-gray-900 cursor-pointer">
        <td class=" border-gray-500 p-1 flex flex-col items-center ">
        <img class="w-14 pl-3" src="${val.image}"/>
        <p class="pl-3 mt-2">${val.name}</p>
        </td>
        <td class=" p-1 border-gray-500">${val.current_price.toFixed(2)}$</td>
        <td class=" p-1 border-gray-500">${allprofit > 0 ? `<span class="text-green-700">${allprofit}%</span>` : `<span class="text-red-600">${allprofit}%</span>`}</td>
        <td class=" p-1 border-gray-500">${val.market_cap.toString().slice(0, -6)}M</td>
    </tr>`;
            tableData.innerHTML += dataItem;
        });

    }

}
loadData();



const moreInformation = async (data) => {
    bodyOverlay.classList.remove('hidden');
    const loadSingle = await fetch(`https://api.coingecko.com/api/v3/coins/${data}`);
    const jsonSingle = await loadSingle.json();
    showModal(jsonSingle);
    modalContent.classList.add('active');

}


const modalContent = document.querySelector('.modal-all-content');
const showModal = (data) => {

    let modalItems = `
    <div div class="modal-head py-3 border-b border-gray-600 flex justify-between items-center">
        <img class="w-12" src="${data.image.small}" alt=""
            srcset="">
        <button onclick="closemodal()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </button>

    </div>`;
    modalContent.innerHTML = modalItems;

}



const closemodal = () => {
    bodyOverlay.classList.add('hidden');
    modalContent.classList.remove('active');
}
bodyOverlay.addEventListener('click', closemodal);