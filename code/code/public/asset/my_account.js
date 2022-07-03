$(function(){
    //Năm tự động điền vào select
        var seYear = $('#year');
        var date = new Date();
        var cur = date.getFullYear();
    
        seYear.append('<option value="">-- Year --</option>');
        for (i = cur; i >= 1950; i--) {
            seYear.append('<option value="'+i+'">'+i+'</option>');
        };
        
        //Tháng tự động điền vào select
        var seMonth = $('#month');
        var date = new Date();
        
        var month=new Array();
        month[1]="January";
        month[2]="February";
        month[3]="March";
        month[4]="April";
        month[5]="May";
        month[6]="June";
        month[7]="July";
        month[8]="August";
        month[9]="September";
        month[10]="October";
        month[11]="November";
        month[12]="December";
    
        seMonth.append('<option value="">-- Month --</option>');
        for (i = 12; i > 0; i--) {
            seMonth.append('<option value="'+i+'">'+month[i]+'</option>');
        };
        
        //Ngày tự động điền vào select
        function dayList(month,year) {
            var day = new Date(year, month, 0);
            return day.getDate();
        }    
        
        $('#year, #month').change(function(){
            //Đoạn code lấy id không viết bằng jQuery để phù hợp với đoạn code bên dưới
            var y = document.getElementById('year');
            var m = document.getElementById('month');
            var d = document.getElementById('day');
            
            var year = y.options[y.selectedIndex].value;
            var month = m.options[m.selectedIndex].value;
            var day = d.options[d.selectedIndex].value;
            if (day == ' ') {
                var days = (year == ' ' || month == ' ')? 31 : dayList(month,year);
                d.options.length = 0;
                d.options[d.options.length] = new Option('-- Day --',' ');
                for (var i = 1; i <= days; i++)
                d.options[d.options.length] = new Option(i,i);
            }
        });
    });


 //Select Nation
 var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);   