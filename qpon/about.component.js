(function(app) {
    /* global ng */
    app.AboutComponent = ng.core
        .Component({
            selector: 'qpon-about',
            templateUrl: "qpon/templates/about.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES]
        })
        .Class({
            constructor:
                function AboutComponentConstructor() {
                    this.works = [
                        {
                            title: 'весна 2016 —­ студ. проект “AnalyzeMe”',
                            link: 'https://github.com/lanit-tercom-school/analyzeme',
                            description: 'делаю фронт­енд на фреймворке Angular 2 (JavaScript, HTML, CSS)'
                        },
                        {
                            title: 'осень 2015',
                            description: 'сделал распознавание цифр на изображении через ансамблевый классификатор (Python, scikit­learn)'
                        },
                        {
                            title: 'лето 2015 — летняя школа “CUDA Fingerprinting 2” в “Ланит­-Терком”',
                            link: 'https://github.com/Stanislav-Sartasov/CUDA-Fingerprinting',
                            description: 'реализовал параллельные алгоритмы скелетизации изображения отпечатка пальца, нахождения минуций(особых точек) на скелетизованном изображении отпечатка пальца (C# ­ прототипирование, NVIDIA CUDA ­ итоговая реализация)'
                        },
                        {
                            title: 'весна 2014 —­ fork студ. проекта “QReal”',
                            link: 'https://github.com/maxim-yakupov/qreal',
                            description: 'участвовал в создании генератора F# кода из диаграмм (C++/Qt)'
                        },
                        {
                            title: 'а также множество учебных программ',
                            link: 'https://github.com/maxim-yakupov/University',
                            description: 'от калькулятора, до мини­-клиента http://bash.im/; от p2p чата, до очередной графической реализации Сокобана :)'
                        }
                    ];
                },
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            },
            resolveLink: function (link) {
                if (link) window.open(link, '_blank');
            }
        });
})(window.app || (window.app = {}));
