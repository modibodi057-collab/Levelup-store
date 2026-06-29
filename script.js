
var removebtn = document.getElementsByClassName("btn-danger");
console.log(removebtn );
for(var i=0;i<removebtn.length;i++){
    var button= removebtn[i] 
    button.addEventListener('click',function(event){
        var removebtnclicked = event.target
        removebtnclicked.parentElement.parentElement.remove()
        updatetotalcart()
    })
}

function updatetotalcart(){
    var cartrowelement = document.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartrowelement.length; i++){
        var cartrow = cartrowelement[i]
        var cartprice = cartrow.getElementsByClassName('cart-price')[0]
        var cartquantity = cartrow.getElementsByClassName('cart-quantity-input')[0]

        // تجاهل الصف العلوي الخاص بالعناوين
        if(cartprice == null || cartquantity == null){
            continue
        }
        var price = parseFloat(cartprice.innerText.replace('$', ''))
        var quantity = parseFloat(cartquantity.value)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

var quantityinput = document.getElementsByClassName('cart-quantity-input')
for(var i=0;i< quantityinput.length;i++){
var input= quantityinput[i]
input.addEventListener('change',quantitychange)
}

var addcartbutton = document.getElementsByClassName('shop-item-button')
for(var i=0;i<addcartbutton.length;i++){
    var addcart = addcartbutton[i]
    addcart.addEventListener('click',addcartclicked)
}
function addcartclicked(event){
var button= event.target
var shopitem =button.parentElement.parentElement
var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText
var price= shopitem.getElementsByClassName('shop-item-price')[0].innerText
var image = shopitem.getElementsByClassName('shop-item-image')[0].src
addtocart(title,price,image)
console.log(title,price,image)
 updatetotalcart()
}
function addtocart(title,price,image){
    var cartrow = document.createElement('div')
    //cartrow.classList.add('cart-items')
    var cartitems = document.getElementsByClassName('cart-items')[0]
    var cartitemsname = document.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartitemsname.length;i++){
if(cartitemsname[i].innerText== title){
    alert('this item is added before')
    return
}
    }
    var cartrowcontents = `
     <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${image}" width="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
    `
    cartrow.innerHTML = cartrowcontents 
    cartitems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecart)
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantitychange)
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseclicked)
}
function removecart(event){
  var removebtnclicked = event.target
        removebtnclicked.parentElement.parentElement.remove()
        updatetotalcart()
}
function quantitychange(event){
    var input=event.target
    if(isNaN(input.value) || input.value<= 0){
        input.value = 1
    }
 updatetotalcart()
}
function purchaseclicked(){
    alert('thank you for your purchase')
    var cartitems=document.getElementsByClassName('cart-items')[0]
    while(cartitems.hasChildNodes()){
        cartitems.removeChild(cartitems.firstChild)
    }
    updatetotalcart()
}

// استهداف زر الاستكشاف
var exploreBtn = document.getElementsByClassName('btn-explore')[0];

if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
        // تحديد القسم الذي نريد الذهاب إليه (قسم المنتجات)
        var storeSection = document.getElementById('store-section');
        
        // وظيفة التمرير السلس
        storeSection.scrollIntoView({ behavior: 'smooth' });
        
        // (إضافة جمالية) وميض خفيف للزر عند الضغط
        exploreBtn.style.opacity = "0.5";
        setTimeout(() => { exploreBtn.style.opacity = "1"; }, 100);
    });
}
// استهداف زر التشغيل
var playBtn = document.getElementsByClassName('btn-play')[0];

if (playBtn) {
    playBtn.addEventListener('click', function() {
        // إنشاء النافذة المنبثقة (Modal)
        var modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        // إضافة محتوى الفيديو (الرابط المقترح)
        modal.innerHTML = `
            <div style="position: relative; width: 85%; max-width: 800px; border: 2px solid #00ffcc; box-shadow: 0 0 20px #00ffcc;">
                <button id="close-vid" style="position: absolute; top: -40px; right: 0; background: none; color: #00ffcc; border: 1px solid #00ffcc; padding: 5px 10px; cursor: pointer; font-family: sans-serif;">CLOSE [X]</button>
                <div style="padding-top: 56.25%; position: relative;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                        src="http://www.youtube.com/watch?v=Tbw3w0RA0WU" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // وظيفة إغلاق الفيديو عند الضغط على زر CLOSE أو خارج الفيديو
        document.getElementById('close-vid').onclick = function() {
            modal.remove();
        };
        
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        };
    });
}
