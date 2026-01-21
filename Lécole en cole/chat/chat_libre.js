
  
function sendmsg(){
  var now = new Date();
  var annee   = now.getFullYear();
  var mois    = now.getMonth() + 1;
  var jour    = now.getDate();
  var heure   = now.getHours();
  var minute  = now.getMinutes();

  var message =`
  <div class="received-chats">
  <div class="received-msg">
    <div class="received-msg-inbox">
      <p>
        ${document.getElementById("send-txt-zone").value}
      </p>
      <span class="time">${heure+":"+minute+" | "+jour+"/"+mois+"/"+annee}</span>
    </div>
  </div>
  </div>
`
  document.querySelector('.msg-bottom').insertAdjacentHTML("beforebegin", message)
};