/// test-my-function.js
/// alias tmf.js
/// world ISOLATED
// example.com##+js(tmf)
function testMyFunction() {
	if ( selector === '' || element === '') { return; }
    window.alert('TEST');
    //return document.getElementById('project_id').value;
	runAt(( ) => { tmf(); }, 'interactive');
}
/******************************************************************************/
// window.alert('TEST');
// var ProjehtId = document.getElementById('project_id').value;
// getDeleiverablesByProjectIdandGateId(ProjehtId,'2','2');
// window.alert(ProjehtId);
/******************************************************************************/
