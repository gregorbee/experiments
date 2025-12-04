'use strict';

export const builtinScriptlets = [];

/******************************************************************************/

builtinScriptlets.push({
    name: 'find-project-id.js',
    requiresTrust: true,
    fn: trustedFindId,
    world: 'ISOLATED',
});
function trustedFindId() {
  window.alert('TEST');
  // return document.getElementById('project_id').value;
}

/******************************************************************************/

// window.alert('TEST');
// var ProjehtId = document.getElementById('project_id').value;
// getDeleiverablesByProjectIdandGateId(ProjehtId,'2','2');
// window.alert(ProjehtId);

/******************************************************************************/
