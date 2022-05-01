// var user = document.querySelectorAll('#user__click');
// var information = document.getElementById("user__detail");
// var window = document.getElementsTagName("body");
// user.onclick = function() {
//     information.style.display = "block";
//     return false;
// }
// window.onclick = function(event) {
//         if (event.target == user) {
//           information.style.display = "none";
//      }
// }
// for (i = 0; i < user.length; i++)
// {
//     user.onclick = function() {
//         information.style.display = "block";
//     }
//     window.onclick = function(event) {
//         if (event.target == information) {
//           information.style.display = "none";
//         }
//     }
//  }

        const buyBtns = document.querySelectorAll('.js_open')
        const modal = document.querySelector('.js_contain')
        const modalClose = document.querySelector('.container')
        const modalClose2 = document.querySelector('.container-list')
        const modalContainer = document.querySelector('.js-modal-container')

        //hàm hiển thị modal(thêm class open vào modal)
        function showBuyTickets(){
            modal.classList.add('open')
        }

        //hàm ẩn modal(gỡ bỏ class open của modal)
        function hideBuyTickets(){
            modal.classList.remove('open')
        }

        //Lặp qua từng thẻ button và lắng nghe hành vi click
        for(const buyBtn of buyBtns){
            buyBtn.addEventListener('click', showBuyTickets)
        }

        //Nghe hành vi click vào button close
        modalClose.addEventListener('click', hideBuyTickets)
        modalClose2.addEventListener('click', hideBuyTickets)



        