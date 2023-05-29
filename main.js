var game = {
    money: 10,
    totalMoney: 10,
    tempMultiplier: 1,
    knowledgePoints: 0,
    totalKP: 0,
    tempMultiplierIncrease: 0.3,
    
    addMoney: function(amount) {
        this.money = Decimal.plus(this.money.toString(), amount.toString()).toString();
        this.totalMoney = Decimal.plus(this.totalMoney.toString(), amount.toString()).toString();
        return(this.money)
    },

    getMoneyPerSecond: function() {
        var moneyPerSecond = new Decimal(new Decimal(productor.amount[0].toString()).times(productorMultiplier.multiplier[0].toString())).times(this.tempMultiplier.toString());
        return(moneyPerSecond.toString());
    },
};

var breakInfinity = {
    number: function(number) {
        var n = BigInt(number);
        var sn = n.toString
        var m = sn.substring(0, sn.indexOf("e"))
        return(m)
    }
}

var productor = {
    name: [
        "Workers",
        "Hard workers",
        "Harder workers",
        "Very hard workers",
        "Create a worker"
    ],
    price: [
        10,
        100,
        10000,
        1000000,
        1000000000
    ],
    priceMultiplier: [
        100,
        1000,
        10000,
        100000,
        10000000
    ],
    amount: [
        0,
        0,
        0,
        0,
        0
    ],
    produces: [
        0,
        -1,
        -1,
        -1,
        -2
    ],
    until10: [
        10,
        10,
        10,
        10,
        10
    ],

    purchase: function(index, times) {
        for (let t = 0; t < times; t++) {
            if (new Decimal(this.name.length - 5).times(new Decimal(35 + 10 * (this.name.length - 5))).plus(new Decimal('10').plus(this.amount[index])).gt(new Decimal(game.knowledgePoints)) && this.produces[index] == -2) {
                alert('You need ' + ((new Decimal(this.name.length - 5).times(new Decimal(35 + 10 * (this.name.length - 5))).plus(new Decimal('10').plus(this.amount[index])).toString())) + ' knowledge points for this!');
                return(0);
            } else {
                    if (new Decimal(game.money).gte(this.price[index])) {
                        this.until10[index] -= 1;
                        game.addMoney(new Decimal(this.price[index]).times('-1').toString());
                        this.amount[index] = new Decimal(this.amount[index].toString()).plus('1').toString();
                        game.tempMultiplier += game.tempMultiplierIncrease / Math.pow(game.tempMultiplier, 1.5);
                        if (this.until10[index] <= 0) {
                            game.knowledgePoints += 1;
                            game.totalKP += 1;
                            this.price[index] = new Decimal(this.price[index].toString()).times(this.priceMultiplier[index].toString()).toString();
                            if (this.produces[index] !== -2) {
                            productorMultiplier.multiplier[index] = new Decimal(productorMultiplier.multiplier[index].toString()).times(productorMultiplier.multiplierIncrement[index].toString()).toString();
                            this.until10[index] = 10;
                            }
                            else {
                                this.createNewProductor('New worker #' + (this.name.length - 4), new Decimal(this.price[index].toString()).dividedBy(new Decimal(this.priceMultiplier[index].toString()).dividedBy('10')).toString(), new Decimal(this.priceMultiplier[index].toString()).times('100').toString(), -1, Decimal.pow('2', upgrades.amount[0].toString()).toString(), 2, this.price[index].toString())    
                            }
                        };
                        display.updateShop();
                        if (t == times - 1) return(1)
                        } else return(0)
                    }
        }
    },
    getProductionPerSecond: function(pp) {
        var productionPerSecond = 0
        if (pp < productor.name.length - 2) {
            productionPerSecond = new Decimal(productor.amount[pp+1])
        return(new Decimal(new Decimal(productor.amount[pp + 1]).times(new Decimal(productorMultiplier.multiplier[pp + 1].toString()))).times(game.tempMultiplier.toString()).toString());
        }
        else return 0;
    },
    createNewProductor: function(name, price, priceMultiplier, produces, multiplier, multiplierIncrement, storeWP) {
        productorMultiplier.multiplier.pop();
        productorMultiplier.multiplierIncrement.pop();
        this.name.pop();
        this.price.pop();
        this.priceMultiplier.pop();
        this.amount.pop();
        this.produces.pop();
        this.until10.pop();

        this.name.push(name);
        this.price.push(price);
        this.priceMultiplier.push(priceMultiplier);
        this.produces.push(produces);
        this.amount.push(0);
        this.until10.push(10);
        productorMultiplier.multiplier.push(multiplier);
        productorMultiplier.multiplierIncrement.push(multiplierIncrement);

        this.name.push("Create a worker");
        this.price.push(storeWP);
        this.priceMultiplier.push(1000000);
        this.amount.push(0);
        this.produces.push(-2);
        this.until10.push(10);
        productorMultiplier.multiplier.push(1);
        productorMultiplier.multiplierIncrement.push(1);

    }
};

var productorMultiplier = {
    multiplier: [
        1,
        1,
        1,
        1,
        1
    ],
    multiplierIncrement: [
        2,
        2,
        2,
        2,
        1
    ]
}
var upgrades = {
    name: [
        "Knowledge Prestige",
        "Better Temporal Multipliers"
    ],
    description: [
        "Start over again but keep your knowledge points and give a x2 multiplier to all productors",
        "Start over again keeping your knowledge points but the temporal multipliers last longer"
    ],
    price: [
        10,
        3
    ],
    priceIncrement: [
        1,
        1
    ],
    priceType: [
        "productor",
        "upgrade"
    ],
    priceIndex: [
        3,
        0
    ],
    priceIncrementType: [
        "#",
        "amount"
    ],
    amount: [
        0,
        0
    ],
    produces: [
        1,
        2
    ],
    producesAmount: [
        2,
        0.25
    ],
    producesType: [
        "multiplier",
        "sum"
    ],

    purchase: function(index, times) {
        if (this.priceType[index] === "productor") {
            if (productor.amount[this.priceIndex[index]] >= this.price[index]) {
                if (confirm("Are you sure you want to restart?")) {
                    var kP = game.knowledgePoints;
                    var tKP = game.totalKP;
                    var am = this.amount[index];
                    var priceIndex = this.priceIndex[index];
                    var tempMultiplierIncrease = game.tempMultiplierIncrease
                    newSave(10, 10, 1, kP, tKP, tempMultiplierIncrease, ["Workers", "Hard workers", "Harder workers", "Very hard workers", "Create a worker"], [10, 100, 10000, 1000000, 1000000000], [100, 1000, 10000, 100000, 1000000], [0, 0, 0, 0, 0], [0, -1, -1, -1, -2], [10, 10, 10, 10, 10], [1, 1, 1, 1, 1], [2, 2, 2, 2, 1], [10, this.price[1]], [3, this.priceIndex[1]], [0, this.amount[1]])
                    loadGame();
                    this.amount[index] = am;
                    this.priceIndex[index] = priceIndex;
                    this.amount[index]++;
                    var sum = Decimal.multiply(this.producesAmount[index].toString(), this.amount[index].toString())
                    var multiplier = Decimal.pow(this.producesAmount[index].toString(), this.amount[index].toString())
                    if (this.produces[index] === 1) {
                        if (this.producesType[index] === "multiplier") {
                            for (i = 0; i < productorMultiplier.multiplier.length; i++) {
                                productorMultiplier.multiplier[i] = multiplier;
                            }
                        } else if (this.producesType[index] === "sum") {
    
                            for (i = 0; i < productorMultiplier.multiplier.length; i++) {
                                productorMultiplier.multiplier[i] = Decimal.add(sum.toString(), 1);
                            }
                        }
                    } else if (this.produces[index] === 2) {
                        if (this.producesType[index] === "multiplier") game.tempMultiplier = Decimal.multiply("0.3", multiplier.toString()).toString()
                        else if (this.producesType[index] === "sum") game.tempMultiplier = Decimal.sum("0.3", sum.toString()).toString()
                    }
                    if (this.priceIncrementType[index] === "#") {
                        this.priceIndex[index]++;
                    }
                    saveGame();
                    location.reload();
                }
            }
        } else if (this.priceType[index] === "upgrade") {
            if (this.amount[this.priceIndex[index]] >= this.price[index]) {
                if (confirm("Are you sure you want to restart?")) {
                    var kP = game.knowledgePoints;
                    var tKP = game.totalKP;
                    var price = this.price[index];
                    var am = this.amount[index];
                    var priceIndex = this.priceIndex[index];
                    newSave(10, 10, 1, kP, tKP, 0.3, ["Workers", "Hard workers", "Harder workers", "Very hard workers", "Create a worker"], [10, 100, 10000, 1000000, 1000000000], [100, 1000, 10000, 100000, 1000000], [0, 0, 0, 0, 0], [0, -1, -1, -1, -2], [10, 10, 10, 10, 10], [1, 1, 1, 1, 1], [2, 2, 2, 2, 1], [10, 3], [3, 0], [0, 0])
                    loadGame();
                    this.price[index] = price;
                    this.amount[index] = am;
                    this.priceIndex[index] = priceIndex;
                    this.amount[index]++;
                    var sum = Decimal.multiply(this.producesAmount[index].toString(), this.amount[index].toString())
                    var multiplier = Decimal.pow(this.producesAmount[index].toString(), this.amount[index].toString())
                    if (this.produces[index] === 1) {
                        if (this.producesType[index] === "multiplier") {
                            for (i = 0; i < productorMultiplier.multiplier.length; i++) {
                                productorMultiplier.multiplier[i] = multiplier;
                            }
                        } else if (this.producesType[index] === "sum") {
                            for (i = 0; i < productorMultiplier.multiplier.length; i++) {
                                productorMultiplier.multiplier[i] = Decimal.add(sum.toString(), 1);
                            }
                        }
                    } else if (this.produces[index] === 2) {
                        if (this.producesType[index] === "multiplier") game.tempMultiplierIncrease = Decimal.multiply("0.3", multiplier.toString()).toString()
                        else if (this.producesType[index] === "sum") game.tempMultiplierIncrease = Decimal.add("0.3", sum.toString()).toString()
                    }
                    if (this.priceIncrementType[index] === "#") this.priceIndex[index]++
                    else if (this.priceIncrementType[index] === "amount") this.price[index] += this.priceIncrement[index];
                    saveGame();
                    location.reload();
                }
            }
        }
    }
};

var autobuyers = {
    price: [
        1e20,
        1e25,
        1e30,
        1e35,
        1e200
    ],
    priceMultiplier: [
        1e5,
        1e10,
        1e15,
        1e20,
        1e30
    ],
    speed: [
        500,
        500,
        500,
        500,
        2000
    ],
    boughtCount: [
        0,
        0,
        0,
        0,
        0
    ],
    bulkBuy: [
        1,
        1,
        1,
        1,
        1
    ],
    timer: [
        0,
        0,
        0,
        0,
        0
    ],

    purchase: function(index) {
        if (new Decimal(game.money.toString()).gte(new Decimal(this.price[index].toString()))) {
            game.addMoney(new Decimal(this.price[index].toString()).times('-1'));
            this.speed[index] -= 50
            this.boughtCount[index]++
            if (this.speed[index] == 0) {
                this.speed[index] = 1
            } else this.price[index] = new Decimal(this.price[index]).times(this.priceMultiplier[index].toString()).toString()
            return(1)
        } else return(0)
    }
}

var pages = {
    findPage: function() {
        url = window.location.href;
        filename = url.substring(url.lastIndexOf('/')+1);
        return(filename.replace(".html", ""))
    },

    page: "",

    name: [
        "Main",
        "Autobuyers"
    ],
    description: [
        "Go to the main page",
        "Go to the autobuyers"
    ],
    index: [
        "index",
        "autobuyers"
    ],
    appearsIn: [
        1,
        1
    ]
};

pages.page = pages.findPage();

var display = {
    updateMoney: function() {
            if (game.totalKP >= 0) {
                document.getElementById("kp").innerHTML = 'You have ' + shortInput(Math.floor(game.knowledgePoints)) + ' knowledge points.'
            };
            document.getElementById("money").innerHTML = shortInput(Decimal.floor(game.money), 2);
            document.getElementById("moneypersecond").innerHTML = shortInput(Decimal.floor(game.getMoneyPerSecond()), 2);
            document.getElementById("tempmultiplier").innerHTML = shortInput(Decimal.floor(game.tempMultiplier * 100) / 100, 2);
    },
    updateShop: function() {
        buyables = [];
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < productor.name.length; i++) {
            if (new Decimal(game.money.toString()).gte(productor.price[i].toString())) {
                if (productor.produces[i] == -2) {
                    if (new Decimal(game.knowledgePoints).gte(new Decimal(productor.name.length - 5).times(new Decimal(35 + 10 * (productor.name.length - 5))).plus(new Decimal('10').plus(productor.amount[i])).toString())) {
                        buyables.push(1)
                    } else buyables.push(0)
                } else buyables.push(1)
            } else buyables.push(0);
            if (buyables[buyables.length - 1] == 1) {
                document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable sbbuyable" onclick="productor.purchase('+i+', 10)"><tr><td id="nameAndCost"><p>'+productor.name[i]+'</p><p>This costs '+shortInput(new Decimal(productor.price[i]).toString(), 3)+' coins<span id="kp'+i+'"> and '+shortInput((productor.name.length - 5) * (35 + 10 * (productor.name.length - 5)) + 10 + productor.amount[i], 3)+' knowledge points</span></p></td><td id="amount"><div class="am"><span id="'+i+'">'+shortInput(Math.round(productor.amount[i]), 3)+' (x'+shortInput(productorMultiplier.multiplier[i], 2)+')</span></div><div class="untilten"><p><span id="a'+i+'">'+productor.until10[i]+' until 10</span></div></td></tr></table>';
            }
            else {
                document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable sbnotbuyable" onclick="productor.purchase('+i+', 10)"><tr><td id="nameAndCost"><p>'+productor.name[i]+'</p><p>This costs <span>'+shortInput(productor.price[i], 3)+' coins<span id="kp'+i+'"> and '+(productor.name.length - 5) * (35 + 10 * (productor.name.length - 5)) + 10 + productor.amount[i]+' knowledge points</span></span></p></td><td id="amount"><div class="am"><span id="'+i+'">'+shortInput(Math.round(productor.amount[i]), 3)+' (x'+shortInput(productorMultiplier.multiplier[i], 3)+')</span></div><div class="untilten"><p><span id="a'+i+'">'+productor.until10[i]+' until 10</span></div></td></tr></table>';
            }
        }
        updateValues()
    },
    updateUpgrades: function() {
        availableUpgrades = [];
        document.getElementById("upgradeContainer").innerHTML = ""
        for (i = 0; i < upgrades.name.length; i++) {
            if (upgrades.priceType[i] === "productor") {
                if (productor.name.length > (upgrades.priceIndex[i] + 1)) {
                    if (productor.amount[upgrades.priceIndex[i]] >= upgrades.price[i]) {
                        availableUpgrades.push(2);
                        document.getElementById("upgradeContainer").innerHTML += '<table class="upgradeButton unselectable upbuyable" onclick="upgrades.purchase('+i+', 1)"><tr><td id="nameCostAndDescription"><p>'+upgrades.name[i]+'</p><p>You need <span>'+shortInput(upgrades.price[i], 3)+' of "'+productor.name[upgrades.priceIndex[i]]+'"</span></p><p>'+upgrades.description[i]+'</p></td><td id="amount"><div class="am"><span id="u'+i+'">'+upgrades.amount[i]+'</span></div></td></tr></table>'
                    }
                    else {
                        availableUpgrades.push(1);
                        document.getElementById("upgradeContainer").innerHTML += '<table class="upgradeButton unselectable upnotbuyable" onclick="upgrades.purchase('+i+', 1)"><tr><td id="nameCostAndDescription"><p>'+upgrades.name[i]+'</p><p>You need <span>'+shortInput(upgrades.price[i], 3)+' of "'+productor.name[upgrades.priceIndex[i]]+'"</span></p><p>'+upgrades.description[i]+'</p></td><td id="amount"><div class="am"><span id="u'+i+'">'+upgrades.amount[i]+'</span></div></td></tr></table>'
                    }
                }
                else availableUpgrades.push(0);
                } else if (upgrades.priceType[i] === "upgrade") {
                        if (upgrades.amount[upgrades.priceIndex[i]] >= upgrades.price[i]) {
                            availableUpgrades.push(2);
                            document.getElementById("upgradeContainer").innerHTML += '<table class="upgradeButton unselectable upbuyable" onclick="upgrades.purchase('+i+', 1)"><tr><td id="nameCostAndDescription"><p>'+upgrades.name[i]+'</p><p>You need <span>'+shortInput(upgrades.price[i], 3)+' of "'+upgrades.name[upgrades.priceIndex[i]]+'"</span></p><p>'+upgrades.description[i]+'</p></td><td id="amount"><div class="am"><span id="u'+i+'">'+upgrades.amount[i]+'</span></div></td></tr></table>'
                        }
                        else availableUpgrades.push(0);
                }
        }
        updateValues()
    },
    updatePageButtons: function() {
        document.getElementById("pageButtonContainer").innerHTML = ""
        for (i = 0; i < pages.name.length; i++) {
            if (pages.appearsIn[i] == "pages.page" || pages.appearsIn[i] == 1) {
                document.getElementById("pageButtonContainer").innerHTML += '<p onclick="changePage(\'' + pages.index[i] + '\')" class="pagebutton unselectable">'+pages.name[i]+'</p>'
            }
        }
    },
    updateAutobuyers: function() {
        document.getElementById("autobuyerButtonContainer").innerHTML = ""
        for (i = 0; i < autobuyers.speed.length; i++) {
            document.getElementById("autobuyerButtonContainer").innerHTML += ''
        }
    }
}

function newSave(money, totalMoney, tempMultiplier, knowledgePoints, totalKP, tempMultiplierIncrease,productorName, productorPrice, productorPriceMultiplier, productorAmount, productorProduces, productorUntil10, productorMultiplier, productorMultiplierIncrement, upgradesPrice, upgradesPriceIndex, upgradesAmount ) {
    gameSave = {
        money: money,
        totalMoney: totalMoney,
        tempMultiplier: tempMultiplier,
        knowledgePoints: knowledgePoints,
        totalKP: totalKP,
        tempMultiplierIncrease: tempMultiplierIncrease,
        productorName: productorName,
        productorPrice: productorPrice,
        productorPriceMultiplier: productorPriceMultiplier,
        productorAmount: productorAmount,
        productorProduces: productorProduces,
        productorUntil10: productorUntil10,
        productorMultiplier: productorMultiplier,
        productorMultiplierIncrement: productorMultiplierIncrement,
        upgradesPrice: upgradesPrice,
        upgradesPriceIndex: upgradesPriceIndex,
        upgradesAmount: upgradesAmount,
        buyables: [],
        nextBuyables: [],
        availableUpgrades: [],
        nextAU: [],
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function saveGame() {
    gameSave = {
        money: game.money,
        totalMoney: game.totalMoney,
        tempMultiplier: game.tempMultiplier,
        knowledgePoints: game.knowledgePoints,
        totalKP: game.totalKP,
        tempMultiplierIncrease: game.tempMultiplierIncrease,
        productorName: productor.name,
        productorPrice: productor.price,
        productorPriceMultiplier: productor.priceMultiplier,
        productorAmount: productor.amount,
        productorProduces: productor.produces,
        productorUntil10: productor.until10,
        productorMultiplier: productorMultiplier.multiplier,
        productorMultiplierIncrement: productorMultiplier.multiplierIncrement,
        upgradesPrice: upgrades.price,
        upgradesAmount: upgrades.amount,
        upgradesPriceIndex: upgrades.priceIndex,
        buyables: buyables,
        nextBuyables: nextBuyables,
        availableUpgrades: availableUpgrades,
        nextAU: nextAU
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
};
function loadGame () {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.money !== "undefined") game.money = savedGame.money;
        if (typeof savedGame.totalMoney !== "undefined") game.totalMoney = savedGame.totalMoney;
        if (typeof savedGame.tempMultiplier !== "undefined") game.tempMultiplier = savedGame.tempMultiplier;
        if (typeof savedGame.knowledgePoints !== "undefined") game.knowledgePoints = savedGame.knowledgePoints;
        if (typeof savedGame.totalKP !== "undefined") game.totalKP = savedGame.totalKP;
        if (typeof savedGame.tempMultiplierIncrease !== "undefined") game.tempMultiplierIncrease = savedGame.tempMultiplierIncrease;
        if (typeof savedGame.productorName !== "undefined") {
            productor.name = []
            for (i = 0; i < savedGame.productorName.length; i += 1) {
                productor.name[i] = savedGame.productorName[i];
            }
        };
        if (typeof savedGame.productorPrice !== "undefined") {
            productor.price = []
            for (i = 0; i < savedGame.productorPrice.length; i += 1) {
                productor.price[i] = savedGame.productorPrice[i];
            }
        };
        if (typeof savedGame.productorPriceMultiplier !== "undefined") {
            productor.priceMultiplier = []
            for (i = 0; i < savedGame.productorPriceMultiplier.length; i += 1) {
                productor.priceMultiplier[i] = savedGame.productorPriceMultiplier[i];
            }
        };
        if (typeof savedGame.productorAmount !== "undefined") {
            productor.amount = []
            for (i = 0; i < savedGame.productorAmount.length; i += 1) {
                productor.amount[i] = savedGame.productorAmount[i];
            }
        };
        if (typeof savedGame.productorProduces !== "undefined") {
            productor.produces = []
            for (i = 0; i < savedGame.productorProduces.length; i += 1) {
                productor.produces[i] = savedGame.productorProduces[i];
            }
        };
        if (typeof savedGame.productorUntil10 !== "undefined") {
            productor.until10 = []
            for (i = 0; i < savedGame.productorUntil10.length; i += 1) {
                productor.until10[i] = savedGame.productorUntil10[i];
            }
        };
        if (typeof savedGame.productorMultiplier !== "undefined") {
            productorMultiplier.multiplier = []
            for (i = 0; i < savedGame.productorMultiplier.length; i += 1) {
                productorMultiplier.multiplier[i] = savedGame.productorMultiplier[i];
            }
        };
        if (typeof savedGame.productorMultiplierIncrement !== "undefined") {
            productorMultiplier.multiplierIncrement = []
            for (i = 0; i < savedGame.productorMultiplierIncrement.length; i += 1) {
                productorMultiplier.multiplierIncrement[i] = savedGame.productorMultiplierIncrement[i];
            }
        };
        if (typeof savedGame.upgradesPrice !== "undefined") {
            upgrades.price = []
            for (i = 0; i < savedGame.upgradesPrice.length; i += 1) {
                upgrades.price[i] = savedGame.upgradesPrice[i];
            }
        };
        if (typeof savedGame.upgradesAmount !== "undefined") {
            upgrades.amount = []
            for (i = 0; i < savedGame.upgradesPrice.length; i += 1) {
                upgrades.amount[i] = savedGame.upgradesAmount[i];
            }
        };
        if (typeof savedGame.upgradesPriceIndex !== "undefined") {
            upgrades.priceIndex = []
            for (i = 0; i < savedGame.upgradesPriceIndex.length; i += 1) {
                upgrades.priceIndex[i] = savedGame.upgradesPriceIndex[i];
            }
        };
        if (typeof savedGame.buyables !== "undefined") {
            for (i = 0; i < savedGame.buyables.length; i += 1) {
                buyables[i] = savedGame.buyables[i];
            }
        };
        if (typeof savedGame.nextBuyables !== "undefined") {
            for (i = 0; i < savedGame.nextBuyables.length; i += 1) {
                nextBuyables[i] = savedGame.nextBuyables[i];
            }
        };
        if (typeof savedGame.availableUpgrades !== "undefined") {
            for (i = 0; i < savedGame.availableUpgrades.length; i += 1) {
                availableUpgrades[i] = savedGame.availableUpgrades[i];
            }
        };
        if (typeof savedGame.nextAU !== "undefined") {
            for (i = 0; i < savedGame.nextAU.length; i += 1) {
                nextAU[i] = savedGame.nextAU[i];
            }
        };
    }
};

function shortInput(input, maxPrecision) {
    var log = Decimal.log10(input.toString())
    if (log >= 6) {
        const exponent = Math.floor(log);
        const rounded = new Decimal(new Decimal(input.toString()).dividedBy(Decimal.pow(10, exponent))).toFixed(maxPrecision)
        return(rounded.toString() + 'e' + exponent);
    } else return(input);
    if (unused = 1) {
        var mantissa = input / Math.pow(10, Math.floor(Math.log10(input)));
        var mantissa = Math.floor(mantissa * Math.pow(10, maxPrecision));
        var mantissa = mantissa / Math.pow(0.1, maxPrecision)

        var exp = Math.floor(Math.log10(input));

        return(mantissa + 'e' + exp);
    }
};

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        loadGame();
        location.reload();
    }
};

function onLoad() {
    buyables = [];
    nextBuyables = [];
    availableUpgrades = [];
    nextAU = [];
    loadGame();
    if (pages.page == "index") {
        display.updateShop();
        display.updateUpgrades()
    };
    display.updatePageButtons()
};

function changePage(page) {
    saveGame();
    window.location.href = page+'.html'
};

window.onload = function() {
    onLoad();
};

let timer = 0;

setInterval(function() {
    for (i = 0; i < autobuyers.price.length; i++) {
        if (autobuyers.boughtCount[i] > 0) {
            autobuyers.timer[i] += autobuyers.price.length;
            if (autobuyers.timer[i] >= autobuyers.speed[i]) {
                autobuyers.timer[i] = 0;
                if (autobuyers.bulkBuy[i] == -1) {
                    var success = 1;
                    for (tries = 0; success = 1; tries++) {
                        success = productor.purchase(i, 1)
                    }
                } else productor.purchase(i, autobuyers.bulkBuy[i])
            }
        }   
    }
}, 1);

setInterval(function() {
    if (game.money == "Infinity") game.money = new Decimal('1.8e308')
    updateValues()
}, 10);

function updateValues() {
    game.addMoney(new Decimal(new Decimal(game.getMoneyPerSecond()).times('0.01')).toString());
    display.updateMoney();
    document.title = shortInput(Decimal.floor(game.money), 2) + " coins - Random Incremental";
    if (pages.page == "index") {
        for (i = 0; i < productor.name.length; i++) {
            productor.amount[i] = new Decimal(productor.amount[i]).plus(new Decimal(productor.getProductionPerSecond(i)).times('0.01'));
            document.getElementById(i).innerHTML = shortInput(Decimal.floor(productor.amount[i]).toString(), 2) + ' (x'+shortInput(productorMultiplier.multiplier[i], 2)+')';
            if (i === productor.name.length - 1) document.getElementById('kp' + i).innerHTML = ' and ' + shortInput(new Decimal(productor.name.length - 5).times(new Decimal(35 + 10 * (productor.name.length - 5))).plus(new Decimal('10').plus(productor.amount[i])).toString(), 2) + ' knowledge points'
            else document.getElementById('kp' + i).innerHTML = ''
        }
    }
}

setInterval(function() {
    saveGame();
}, 25000);

setInterval(function() {
    game.tempMultiplier *= 0.995
    if (game.tempMultiplier < 1) game.tempMultiplier = 1;
    nextBuyables = [
    ];
    nextAU = [
    ];
    for (i = 0; i < productor.name.length; i++) {
        if (new Decimal(game.money.toString()).gte(productor.price[i].toString())) {
            if (productor.produces[i] == -2) {
                if (new Decimal(game.knowledgePoints).gte(new Decimal(productor.name.length - 5).times(new Decimal(35 + 10 * (productor.name.length - 5))).plus(new Decimal('10').plus(productor.amount[i])).toString())) {
                    nextBuyables.push(1)
                } else nextBuyables.push(0)
            } else nextBuyables.push(1)
        } else nextBuyables.push(0)
    };
    if (pages.page == "index") if (buyables.toString() !== nextBuyables.toString()) display.updateShop();//para comparar arrays, lo mejor es convertirlos a strings usando la funcion "array".toString()
    for (i = 0; i < upgrades.name.length; i++) {
        if (upgrades.priceType[i] === "productor") {
            if (productor.name.length > upgrades.priceIndex[i]) {
                if (productor.amount[upgrades.priceIndex[i]] >= upgrades.price[i]) nextAU.push(2)
                else nextAU.push(1)
            }
            else nextAU.push(0);
            } else if (upgrades.priceType[i] === "upgrade") {
                if (upgrades.amount[upgrades.priceIndex[i]] >= upgrades.price[i]) nextAU.push(2)
                else nextAU.push(0)
            }
        }
    if (pages.page == "index") if (availableUpgrades.toString() !== nextAU.toString()) display.updateUpgrades()
}, 100);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { //ctrl + s, event.which == 65 es la tecla A
        event.preventDefault();
        saveGame();
    }
}, false);
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 82) {
        event.preventDefault();
        resetGame();
    }
}, false);