const data = [
    {text: "Github", disable: false},
    {text: "Stack Overflow", disable: false},
    {text: "Google", disable: true},
    {text: "OpenAI", disable: false},
    {text: "JavaScript", disable: true},
    {text: "Python", disable: false},
    {text: "React", disable: true},
    {text: "Node.js", disable: false},
    {text: "HTML", disable: true},
    {text: "CSS", disable: false},
    {text: "Java", disable: false},
    {text: "C++", disable: false},
    {text: "Ruby", disable: false},
    {text: "PHP", disable: false},
    {text: "Swift", disable: false},
    {text: "Kotlin", disable: false},
    {text: "TensorFlow", disable: true},
];

class SelectBox {

    constructor(element, config){
        this.element = element
        this.config = config

        this.milisecondsToOpen = 1
        this.milisecondsToClose = 100
        this.selectContainerElement = null
        this.icon = null
        this.btnText = null
        this.optionsText = []
        this.options = []
        this.searchInput = null

        this.generateSelectBox()
    }

    createHeader(){
        const selectBtn = document.createElement("div")
        selectBtn.classList.add("sbx-select-btn")
        selectBtn.addEventListener("click", this.toogleOptions)

        const btn = document.createElement("span")
        btn.classList.add("sbx-sBtn-text")
        btn.innerText = this.config.name
        this.btnText = btn

        const icon = document.createElement("i")
        icon.classList.add("bi", "bi-chevron-left")
        this.icon = icon 

        selectBtn.appendChild(btn)
        selectBtn.appendChild(icon)
        return selectBtn
    }

    createInputSearch(){
        const search = document.createElement("div")
        search.classList.add("sbx-search")

        const icon = document.createElement("i")
        search.classList.add("bi","bi-search")

        const searchInput = document.createElement("input")
        searchInput.setAttribute("type","search")
        searchInput.setAttribute("id","sbx-input-search")
        searchInput.setAttribute("placeholder","Pesquisar...")
        searchInput.addEventListener("input", e => this.searchOptions(e))
        this.searchInput = searchInput

        search.appendChild(icon)
        search.appendChild(searchInput)
        return search
    }

    createOptions(){
        const ul = document.createElement("ul")

        this.config.options.forEach(option => {
            const li = document.createElement("li")
            li.classList.add("sbx-option")
            li.addEventListener("click", e => this.toogleValueHeader(e))

            const icon = document.createElement("i")
            icon.classList.add("bi","bi-play")

            const optinoText = document.createElement("span")
            optinoText.classList.add("sbx-option-text")
            optinoText.innerText = option

            if (typeof option === "object") {
                optinoText.innerText = option.text
                if (option.disable) {
                    li.classList.add("sbx-disabled")
                }
            }

            li.appendChild(icon)
            li.appendChild(optinoText)
            ul.appendChild(li)

            this.optionsText.push(optinoText)
            this.options.push(li)
        });
        return ul
    }

    screenPosition(){
        const coordinates = this.element.getBoundingClientRect()
        const half = 2
        const verticalPosition = coordinates.top + coordinates.height / half
        if (verticalPosition > window.innerHeight / half) {
            return "down"
        }
        return "up"
    }

    openOptions() {
        this.selectContainerElement.classList.remove("sbx-hide")

        setTimeout(() => {
            this.selectContainerElement.classList.add("sbx-height")
        }, this.milisecondsToOpen)
    }

    closeOptions() {
        this.selectContainerElement.classList.remove("sbx-height")

        setTimeout(() => {
            this.selectContainerElement.classList.add("sbx-hide")
            this.icon.classList.remove("sbx-rotate-down")    
            this.icon.classList.remove("sbx-rotate-up")    

            this.searchInput.value = ""
            this.options.forEach(option => {
                option.classList.remove("sbx-hide")
            })    
        }, this.milisecondsToClose)
    }

    setDown() {
        this.selectContainerElement.classList.add("sbx-open-up")
        this.icon.classList.remove("sbx-rotate-down")    
        this.icon.classList.add("sbx-rotate-up")
    }

    setUp() {
        this.selectContainerElement.classList.remove("sbx-open-up")
        this.icon.classList.remove("sbx-rotate-up") 
        this.icon.classList.add("sbx-rotate-down")    
    }

    toogleOptions = () => {
        if (this.selectContainerElement.classList.contains("sbx-hide")) {
            this.openOptions()
        } else {
            this.closeOptions()
        }
    
        const position = this.screenPosition()

        if (position === "down") {
            this.setDown()
        } else {
            this.setUp()
        }
    }

    searchOptions(e){
        const wordSearch = e.target.value.toLowerCase()

        this.optionsText.forEach((option, index) => {
            if (option.innerText.toLowerCase().includes(wordSearch)) {
                this.options[index].classList.remove("sbx-hide")
                return
            } 
            this.options[index].classList.add("sbx-hide")
        })
    }

    toogleValueHeader(e){
        const optionValue = e.target.innerText
        this.btnText.innerText = optionValue
        this.btnText.value = optionValue

        this.icon.classList.remove("sbx-rotate-up") 
        this.icon.classList.remove("sbx-rotate-down")    

        this.closeOptions()
    }

    autoSetDownOrUp() {
        window.addEventListener("scroll", () => {
            if (this.selectContainerElement.classList.contains("sbx-hide")){
                return
            } 

            if (this.screenPosition() === "down") {
                this.setDown()
                return
            } 

            this.setUp()   
        })
    }

    generateSelectBox(){
        const selectContainer = document.createElement("div")
        const inputSearch = this.createInputSearch()
        const options = this.createOptions()
        const selectMenu = document.createElement("div")
        const header = this.createHeader()

        selectContainer.classList.add("sbx-select-container", "sbx-hide")
        if (this.config.inputSearch) selectContainer.appendChild(inputSearch)
        selectContainer.appendChild(options)

        selectMenu.classList.add("sbx-select-menu")
        selectMenu.appendChild(header)
        selectMenu.appendChild(selectContainer)

        this.autoSetDownOrUp()
        this.selectContainerElement = selectContainer

        document.addEventListener("click", e => {
            const element = e.target
            if (!selectMenu.contains(element) && element !== this.inputSearch){
                this.closeOptions()
            }
        });

        this.element.appendChild(selectMenu)
    }
}

const here = document.querySelector(".here")
const here2 = document.querySelector(".here2")

const select = new SelectBox(
    // Container onde será injetado o select box
    here,
    {
        name: "Select your option1",
        // escolha se terá caixa de pesquisa ou não
        inputSearch: true,
        // Aceita um array de strings ou um obj com text e disabled true ou false
        options: data
})

const select2 = new SelectBox(
    here2,
    {
        name: "Select your option2",
        inputSearch: true,
        options: data
})
