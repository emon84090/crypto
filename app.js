const spinner = document.querySelector('#spinner');
const searchInput = document.querySelector('.data-search input');
const notFoundText = document.querySelector('#nodata');

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

const tableData = document.querySelector('.tableBody');
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

            let dataItem = `<tr onclick="moreInformation('${val.id}')" class="hover:bg-gray-800 cursor-pointer">
        <td class="border-b border-gray-500 p-1 flex flex-col items-center ">
        <img class="w-12 pl-3" src="${val.image}"/>
        <span class="pl-3">${val.name}</span>
        </td>
        <td class="border-b p-1 border-gray-500">${val.current_price.toFixed(2)}$</td>
        <td class="border-b p-1 border-gray-500">${allprofit > 0 ? `<span class="text-green-700">${allprofit}%</span>` : `<span class="text-red-600">${allprofit}%</span>`}</td>
        <td class="border-b p-1 border-gray-500">${val.market_cap.toString().slice(0, -6)}M</td>
    </tr>`;
            tableData.innerHTML += dataItem;
        });

    }

}
loadData();


const moreInformation = (data) => {
    console.log(data);

}









