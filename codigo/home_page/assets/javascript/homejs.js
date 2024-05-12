const list = document.querySelectorAll(.list);
function activelink(){
    list.array.forEach((item) => 
        item.classlist.remove('active'));
        this.classlist.add('active');
}
    list.forEach((item)=>
    item.addEventListener('click',activelink));