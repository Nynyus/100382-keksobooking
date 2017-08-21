
console.log("connected!");

//Определение переменных и массивов

var markWidth = 40; //ширина марки-указателя
var markHeight = 44;// высота марки-указателя

var titles = ["Большая уютная квартира", 
              "Маленькая неуютная квартира",
              "Уютное бунгало далеко от моря", 
              "Неуютное бунгало по колено в воде",
              "Огромный прекрасный дворец", 
              "Маленький ужасный дворец", 
              "Красивый гостевой домик",
              "Некрасивый негостеприимный домик"
              ];
var propertyTypes = [
    "flat",
    "house",
    "bungalo"
];
var checkinTimes = ["12:00",
                "13.00",
                "14.00"];
var checkoutTimes = ["12:00",
                "13.00",
                "14.00"];

var features = ["wifi",
                "dishwasher",
                "parking",
                "washer", 
                "elevator", 
                "conditioner"];

var markOriginal = document.querySelector('.tokyo__pin-map');
var advertisementTemplate = document.querySelector("#lodge-template").content.querySelector(".dialog__panel");
var oldAdd = document.querySelector("#offer-dialog");
var replaced = document.querySelector(".dialog__panel");
var similarListings = [];

//////////////////////////////////////////


createSimilarListings();
drawMarks();
renderAdvertisement();




oldAdd.removeChild(replaced);
oldAdd.appendChild(renderAdvertisement());


/////////////////////////////////////////

//ФУНКЦИИ 



//функция создает массив объектов (похожих объявлений)
function createSimilarListings(){

    for (var i=0;i<8;i++){
    
    
        similarListings.push({
    
            author: {
                avatar:generateAvatar()
            },
            offer: {
                title: generateTitle(),
                address: generateAddress(), 
                price: generatePrice(),
                type: generatePropertyType(),
                rooms: generateRoomNumber(),
                guests: generateGuestsNumber(), 
                checkin: generateCheckin(),
                checkout: generateCheckout(),
                features: generateFeatures(),
                description: " ",
                photos: generatePhotos()
            },
            location: {
                x: generateX(),
                y: generateY()
            } 
            
})}
};

console.log(similarListings[0]);


// функция генерирует фотоаватарку
function generateAvatar() {
    var positions = [1,2,3,4,5,6,7,8];

        var tempStorage = [];
        var len = positions.length;
        while (len) {
            var index = Math.floor(Math.random() * len);
            tempStorage.push(positions.splice(index, 1)[0]);
            len--;
        }
        console.log(tempStorage);

        for (var i=0;i<tempStorage.length;i++){
        var avatar = "img/avatars/user0" + tempStorage[i].toString() + ".png"; 
        }
        console.log(avatar);
        return avatar;
}


//функция герерирует строку-заголовок из массива titles[]
function generateTitle(){
    var newTitle = titles[Math.floor(Math.random() * 8)+1];
    console.log(newTitle);
    return newTitle;
}
//функция ничего толкового не генерирует. Есть вопросы по формулировке задания
function generateAddress(){
    var address = "location.x,  location.Y";
    return address;
    
}
//функция герерирует cлучайную цену от 1000 до 1000000 
function generatePrice(){
    
    var range = Math.round(Math.floor((Math.random()*999000)+1000)/1000)*1000;
    return range;
}
///функция герерирует тип жилья из массива. Есть вопросы  
function generatePropertyType(){
    
    var newType = propertyTypes[Math.floor(Math.random()*propertyTypes.length)+1];
    return newType;
}
//функция герерирует случайное количество комнат от 1 до 5
function generateRoomNumber(){
    var rooms = Math.floor(Math.random()*5+1);
    return rooms;
}
//функция герерирует случайное количество гостей от 1 до 4
function generateGuestsNumber(){
    var guests = Math.floor(Math.random()*3+1);
    return guests;
}
//функция герерирует случайное время въезда из массива времен  chechin 
function generateCheckin(){
    
    var checkinTime = checkinTimes[Math.floor(Math.random()*checkinTimes.length+1)];
    return checkinTime;
}
//функция герерирует случайное время выезда из массива времен  chechout 
function generateCheckout(){
    var checkoutTime = checkoutTimes[Math.floor(Math.random()*checkoutTimes.length+1)];
    return checkoutTime;
}

//функция герерирует новый массив случайной длины из массива features 
function generateFeatures(){
    var range = Math.floor(Math.random()*features.length+1);
    var newSet = [];
    for (var i=0; i<range; i++){
        newSet.push(features[i]);
        
    }
    return newSet;
    
}

//функция герерирует пустой массив для фото
function generatePhotos(){
    var photos = [];
    return photos;
}

//функция герерирует случайную координату X в пределах ширины экрана 
function generateX() {
        var x = Math.floor((Math.random()*600)+300);
        return x;
}

//функция герерирует случайную координату Y в пределах высоты экрана 
function generateY() {
        var y = Math.floor((Math.random()*400)+100);
        return y;
}


//функция отрисовывает указатели адлесов на карте с помощью элемента fragment        
function drawMarks(){
    
var fragment = document.createDocumentFragment();
    for (var i = 0; i < similarListings.length; i++) {
      var newMark = document.createElement('div');    

      var markX = similarListings[i].location.x + markWidth/2;
      var markY = similarListings[i].location.y + markHeight;
      var avatarMark = similarListings[i].author.avatar;    

      newMark.className = 'pin';
      newMark.setAttribute("style", "left:" + markX + "px;" + "top:" + markY + "px");
      newMark.innerHTML =    '<img src="' + avatarMark + '" class="rounded" width="40" height="40">'; 

    fragment.appendChild(newMark);
    }
markOriginal.appendChild(fragment);
};



//функция создает объявление на основе клонированного темплейта
function renderAdvertisement() {
    
    var advertisementElement = advertisementTemplate.cloneNode(true);
    
    advertisementElement.querySelector(".lodge__title").textContent = similarListings[0].offer.title;
    advertisementElement.querySelector(".lodge__address").textContent = similarListings[0].offer.address;
    advertisementElement.querySelector(".lodge__price").innerHTML = similarListings[0].offer.price + " &#x20bd;/ночь";
    
    if (similarListings[0].offer.type === "flat"){
    advertisementElement.querySelector(".lodge__type").textContent = "квартира";
    }
    else if (similarListings[0].offer.type === "house"){
    advertisementElement.querySelector(".lodge__type").textContent = "дом";
    }
    else {
    advertisementElement.querySelector(".lodge__type").textContent = "сарай";
    }
    
    advertisementElement.querySelector(".lodge__rooms-and-guests").textContent = "Для " + similarListings[0].offer.guests+ " гостей в " + similarListings[0].offer.rooms + " комнатах";
    advertisementElement.querySelector(".lodge__checkin-time").textContent = "Заезд после " +  similarListings[0].offer.checkin+ " , выезд до "+similarListings[0].offer.checkout;
    
    advertisementElement.querySelector(".lodge__features").innerHTML = createFeatureList();
    advertisementElement.querySelector(".lodge__description").textContent = similarListings[0].offer.description;
    return advertisementElement;
       
}



//функция создает массив имеющиехся features для отрисовки

function createFeatureList(){
    var featureArr = [];
    
    for (var i=0; i<similarListings[0].offer.features.length;i++){
        featureArr.push('<span class = "feature__image feature__image--' + similarListings[0].offer.features[i] + ' "></span>');
    }
    return featureArr;
}

document.querySelector(".dialog__title").childNodes[0].setAttribute ("src", similarListings[0].author.avatar);//замена аватарки для выбранного объявления


