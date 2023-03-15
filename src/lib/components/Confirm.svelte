<script>
	export let confirm
	export let hide = true

	function showConfirmBox() {

    hide = false
  	console.log(hide)
  }
  
  function closeConfirmBox() {
  	hide = true
  }

  function isConfirm(answer) {
    if (answer) {
      alert("Answer is yes");
      confirm = true
    } else {
      alert("Answer is no");
      confirm = false
    }
    closeConfirmBox();
  }
	 
</script>

<main>
	<div class="overlay" id="overlay" hidden={ hide }>
    <div class="confirm-box">
      <div on:click={ () => closeConfirmBox() } class="close">&#10006;</div>
      <h2>Confirmation</h2>
      <p>Are you sure to execute this action?</p>
      <button on:click={ () => isConfirm(true) }>Yes</button>
      <button on:click={ () => isConfirm(false) }>No</button>
    </div>
  </div>
  <button on:click={ ()=> showConfirmBox() }>Delete</button>

</main>

<style>
	.overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2;
  }

  .confirm-box {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    text-align: center;
    background: white;
  }

  .close {
    cursor: pointer;
  }

</style>