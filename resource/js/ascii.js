const 문자열2List = []
const asciiList = []
const liveAsciiList = []

function 리스트전체출력() {
    문자열2List.length = 0
    asciiList.length = 0
    liveAsciiList.length = 0

    for(let index = 0; index < 128; index++) {
        const tr = document.createElement("tr")
        const td10진수 = document.createElement("th")
        td10진수.innerHTML = index
        const td16진수 = document.createElement("td")
        td16진수.innerHTML = index.toString(16)
        const td08진수 = document.createElement("td")
        td08진수.innerHTML = index.toString(8)
        const td문자열1 = document.createElement("td")
        td문자열1.innerHTML = String.fromCharCode(index)
        const td문자열2 = document.createElement("td")
        문자열2가져오기(index)
        
        tr.appendChild(td10진수)
        tr.appendChild(td16진수)
        tr.appendChild(td08진수)
        tr.appendChild(td문자열1)
        tr.appendChild(td문자열2)

        문자열2List[index] = td문자열2
        asciiList[index] = tr
        liveAsciiList[index] = tr
        
        IdAsciiList.appendChild(tr)
    }
}

function 리스트검색(search) {
    for(let index = 0; index < 128; index++) {
        if(index == search || 
            index.toString(16) == search || 
            index.toString(8) == search || 
            String.fromCharCode(index) == search || 
            문자열2List[index].innerHTML.indexOf(search) != -1) {
                IdAsciiList.appendChild(asciiList[index])
                liveAsciiList[index] = asciiList[index]
        }
    }
}

async function 문자열2가져오기(index) {
    const Http = new XMLHttpRequest()

    const url = '/AA?before=' + index

    Http.open('GET', url)
    Http.send()
    Http.onreadystatechange = (e) => {
        문자열2List[index].innerHTML = Http.responseText
    }
}

function 리스트전체삭제() {
    liveAsciiList.forEach(function(tr) {
        IdAsciiList.removeChild(tr)
    })

    liveAsciiList.length = 0
}

function 검색() {
    if(IdAsciiList.childElementCount != 0) {
        리스트전체삭제()
    }

    if(IdSearch.value == undefined || IdSearch.value.trim() == '') {
        리스트전체출력()
    }
    else {
        리스트검색(IdSearch.value.trim())
    }
}

function 입력칸에서키업() {
    if (window.event.keyCode == 13) {
    	검색()
    }
}

리스트전체출력()