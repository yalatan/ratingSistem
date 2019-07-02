document.addEventListener("DOMContentLoaded", ready);

function ready() {
    let listFilms = [{
            name: "The Goldfather(1972)",
            rate: 0
        },
        {
            name: "The Shawshank Redemotion",
            rate: 0
        },
        {
            name: "The Dark Knight(2008)",
            rate: 0
        },
        {
            name: "12 Angry Men (1957)",
            rate: 0
        },
        {
            name: "Schindler's list (1993)",
            rate: 0
        },
        {
            name: "Tre Lord of the Rings",
            rate: 0
        }
    ];
    if (null == localStorage.getItem("listFilms")) {
        localStorage.setItem("listFilms", JSON.stringify(listFilms));
    }

    /*отрисовка страницы */
    let local;

    function loadpage() {
        local = JSON.parse(localStorage.getItem("listFilms"));
        for (let i = 0; i < local.length; i++) {
            let div = document.createElement('div');
            div.id = "film" + i;
            div.className = "film";
            let spanNameFilm = document.createElement('div');
            spanNameFilm.className = "spanNameFilm";
            spanNameFilm.textContent = local[i].name;
            let spanRate = document.createElement('div');
            spanRate.className = "spanRate";
            let id = "spanRate" + i;
            spanRate.id = id;
            let countRate = local[i].rate;
            for (let q = 0; q < 5; q++) {
                let star = document.createElement('span');
                if (q + 1 <= countRate) {
                    star.className = "star yellow";
                } else {
                    star.className = "star";
                }
                star.innerHTML = "&#9733;"
                star.id = "star" + i + q;
                spanRate.appendChild(star);
            }
            div.appendChild(spanNameFilm);
            div.appendChild(spanRate);
            document.getElementById("wrapper_film").appendChild(div);
        };
    };

    loadpage();

    /*click*/
    function compare(a, b) {
        if (a.rate < b.rate) {
            return 1;
        }
        if (a.rate > b.rate) {
            return -1;
        }
        return 0;
    }
    document.getElementById("wrapper_film").addEventListener('click', function (e) {
        console.log(this);
        console.log(e.target.className == "star");
        if (e.target.className == "star" || e.target.className == "star yellow") {
            console.log(e.target.id);
            let count = e.target.id.slice(5);
            let q = e.target.id.slice(4, 5);
            let text = document.getElementsByClassName("spanNameFilm")[q].innerHTML;
            console.log(text);
            local.find(x => x.name === text).rate = +count + 1;
            local.sort(compare);
            console.log(local);
            localStorage.setItem("listFilms", JSON.stringify(local));
            document.getElementById("wrapper_film").innerHTML = "";
            loadpage();
        }
    })

    //////////////////////
    document.getElementById("addFilm").onclick = function () {
        let newFilmForListFilms = document.getElementById("newFilm").value;
        let newFilm = {
            name: newFilmForListFilms,
            rate: 0
        }
        local.push(newFilm);
        localStorage.setItem("listFilms", JSON.stringify(local));
        document.getElementById("wrapper_film").innerHTML = "";
        loadpage();
        document.getElementById("newFilm").value = "";
    };
    ///////////////////////////////////
    document.getElementById("wrapper_film").addEventListener('mouseover', function (e) {
        //если движение мыши пришлось на звезду
        if (e.target.className == "star") {
            //получаем рейтинг фильма
            let countRate = local[e.target.id.slice(4, 5)].rate;
            console.log(countRate);
            //находим номер звезды на которую пришла мышь
            let count = e.target.id.slice(5);
            // находим id звезды
            let name = e.target.id.slice(0, 5);
            /// для каждой звезды меньше определенной добавим класс желтый
            for (let i = count; i >= 0; i--) {
                let id = name + i;
                document.getElementById(id).classList.add("yellow");
            }
            /// для каждой звезды больше определенной удалим класс желтый
            for (let i = count + 1; i < 6; i++) {
                let id = name + i;
                document.getElementById(id).classList.remove("yellow");
            }
            //если мышь уводим с определенной звезды
            document.getElementById(e.target.id).addEventListener('mouseout', function () {
                //вернем все как в локал стораж 
                for (let i = 0; i < 5; i++) {
                    let id = name + i;
                    if (i > countRate - 1) {
                        document.getElementById(id).classList.remove("yellow");
                    }
                }
            });
        }
    });
};