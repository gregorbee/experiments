'use strict';
/// test-my-function.js
/// alias tmf.js
/// world ISOLATED
// example.com##+js(tmf)
function testMyFunction() {
	const tmf = ( ) => {
		try {
			window.alert('TEST');
    		//return document.getElementById('project_id').value;
			}
		} catch { }
	};
	runAt(( ) => { tmf(); }, 'interactive');
}
/******************************************************************************/
// window.alert('TEST');
// var ProjehtId = document.getElementById('project_id').value;
// getDeleiverablesByProjectIdandGateId(ProjehtId,'2','2');
// window.alert(ProjehtId);
/******************************************************************************/
