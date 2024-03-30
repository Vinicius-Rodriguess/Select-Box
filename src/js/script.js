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
    {text: "PyTorch", disable: false},
    {text: "MongoDB", disable: true},
    {text: "MySQL", disable: false},
    {text: "PostgreSQL", disable: false},
    {text: "Firebase", disable: false},
    {text: "Docker", disable: false},
    {text: "Kubernetes", disable: false},
    {text: "Amazon Web Services", disable: false},
    {text: "Microsoft Azure", disable: false},
    {text: "Linux", disable: true},
    {text: "Windows", disable: false},
    {text: "MacOS", disable: true},
    {text: "Android", disable: false}
];

class SelectBox {

    constructor(element, config){
        this.element = element
        this.config = config

        this.generateSelectBox()
    }

    generateHeader(){
        const selectBtn = document.createElement("div")
        selectBtn.classList.add("select-btn")
        selectBtn.addEventListener("click", this.toogleOptions)

        const btn = document.createElement("span")
        btn.classList.add("sBtn-text")
        btn.innerText = this.config.name

        const icon = document.createElement("i")
        icon.classList.add("bi", "bi-chevron-left")

        selectBtn.appendChild(btn)
        selectBtn.appendChild(icon)

        return selectBtn
    }

    generateInputSearch(){
        const search = document.createElement("div")
        search.classList.add("search")

        const icon = document.createElement("i")
        search.classList.add("bi","bi-search")

        const searchInput = document.createElement("input")
        searchInput.setAttribute("type","search")
        searchInput.setAttribute("id","input-search")
        searchInput.setAttribute("placeholder","Pesquisar...")
        searchInput.setAttribute("value", "")
        searchInput.addEventListener("input", e => this.searchOptions(e))

        search.appendChild(icon)
        search.appendChild(searchInput)

        return search
    }

    generateOptions(){
        const ul = document.createElement("ul")

        this.config.options.forEach(option => {

            const li = document.createElement("li")
            li.classList.add("option")
            li.addEventListener("click", e => this.toogleValueHeader(e))

            const icon = document.createElement("i")
            icon.classList.add("bi","bi-play")

            const optinoText = document.createElement("span")
            optinoText.classList.add("option-text")
            optinoText.innerText = option

            if (typeof option === "object") {
                optinoText.innerText = option.text

                if (option.disable) li.classList.add("disabled")
            }

            li.appendChild(icon)
            li.appendChild(optinoText)

            ul.appendChild(li)
        });

        return ul
    }

    screenPosition(){
        const coordinates = this.element.getBoundingClientRect()
        const verticalPosition = coordinates.top + coordinates.height / 2
    
        if (verticalPosition > window.innerHeight / 2) return "down"

        return "up"
    }

    toogleOptions = () => {
        const selectContainer = document.querySelector(".select-container")
        
        if (selectContainer.classList.contains("hide")) {
            selectContainer.classList.remove("hide")
            setTimeout(() => selectContainer.classList.add("height"), 1)

        } else {

            selectContainer.classList.remove("height")
            setTimeout(() => {
                selectContainer.classList.add("hide")
                icon.classList.remove("rotate-down")    
                icon.classList.remove("rotate-up")    
            }, 100)
        }
        
        const icon = document.querySelector(".select-btn i")

        if (this.screenPosition() === "down") {
            selectContainer.classList.add("open-up")
            icon.classList.remove("rotate-down")    
            icon.classList.add("rotate-up")
            return
        } 

        selectContainer.classList.remove("open-up")
        icon.classList.remove("rotate-up") 
        icon.classList.add("rotate-down")    
    }

    searchOptions(e){
        const target = e.target.value.toLowerCase()

        const optionsText = document.querySelectorAll(".option-text")
        const options = document.querySelectorAll(".option")

        optionsText.forEach((option, index) => {

            if (option.innerText.toLowerCase().includes(target)) {
                options[index].classList.remove("hide")
                return
            } 
            options[index].classList.add("hide")
        })
    }

    toogleValueHeader(e){
        const target = e.target.innerText
        const sBtnText = document.querySelector(".sBtn-text")
        const selectContainer = document.querySelector(".select-container")

        sBtnText.innerText = target
        sBtnText.value = target

        const icon = document.querySelector(".select-btn i")
        icon.classList.remove("rotate-up") 
        icon.classList.remove("rotate-down")    

        selectContainer.classList.remove("height")
        setTimeout(() => selectContainer.classList.add("hide"), 100)
    }

    openDownOrUp() {
        window.addEventListener("scroll", () => {
            const selectContainer = document.querySelector(".select-container")
            const icon = document.querySelector(".select-btn i")
        
            if (selectContainer.classList.contains("hide")) return

            if (this.screenPosition() === "down") {
                selectContainer.classList.add("open-up")
                icon.classList.remove("rotate-down")    
                icon.classList.add("rotate-up")
                return
            } 

            selectContainer.classList.remove("open-up")
            icon.classList.remove("rotate-up") 
            icon.classList.add("rotate-down")    
        })
    }

    generateSelectBox(){
        const selectMenu = document.createElement("div")
        selectMenu.classList.add("select-menu")

        const selectContainer = document.createElement("div")
        selectContainer.classList.add("select-container", "hide")

        selectMenu.appendChild(this.generateHeader())

        if (this.config.inputSearch) selectContainer.appendChild(this.generateInputSearch())
        
        selectContainer.appendChild(this.generateOptions())

        selectMenu.appendChild(selectContainer)

        this.openDownOrUp()

        document.addEventListener("click", e => {
            if (!selectMenu.contains(e.target) && e.target !== this.inputSearch){
                selectContainer.classList.remove("height")
                setTimeout(() => selectContainer.classList.add("hide"), 100)
            }
        });

        this.element.appendChild(selectMenu)
    }
}

const here = document.querySelector(".here")

const select = new SelectBox(
    // Container onde será injetado o select box
    here,
    {
        name: "Select your option",

        // escolha se terá caixa de pesquisa ou não
        inputSearch: true,

        // Aceita um array de strings ou um obj com text e disabled true ou false
        options: data
     })