'use strict';

export const builtinScriptlets = [];

/******************************************************************************/
/******************************************************************************
 * trusted-click-element.js → trusted-test.js
 * Reference API:
 * https://github.com/AdguardTeam/Scriptlets/blob/master/src/scriptlets/trusted-click-element.js
 *****************************************************************************/

builtinScriptlets.push({
    //name: 'trusted-click-element.js',
    name: 'trusted-test.js',
    requiresTrust: true,
    //fn: trustedClickElement,
    fn: trustedTest,
    world: 'ISOLATED',
    dependencies: [
        'run-at-html-element.fn',
        'safe-self.fn',
    ],
});
//function trustedClickElement(
function trustedTest(
    selectors = '',
    extraMatch = '', // not yet supported
    delay = ''
) {
    if ( extraMatch !== '' ) { return; }

    const safe = safeSelf();
    const extraArgs = safe.getExtraArgs(Array.from(arguments), 3);
    const uboLog = extraArgs.log !== undefined
        ? ((...args) => { safe.uboLog(...args); })
        : (( ) => { });

    const selectorList = selectors.split(/\s*,\s*/)
        .filter(s => {
            try {
                void document.querySelector(s);
            } catch(_) {
                return false;
            }
            return true;
        });
    if ( selectorList.length === 0 ) { return; }

    const clickDelay = parseInt(delay, 10) || 1;
    const t0 = Date.now();
    const tbye = t0 + 10000;
    let tnext = selectorList.length !== 1 ? t0 : t0 + clickDelay;

    const terminate = ( ) => {
        selectorList.length = 0;
        next.stop();
        observe.stop();
    };

    const next = notFound => {
        if ( selectorList.length === 0 ) {
            //uboLog(`trusted-click-element: Completed`);
            uboLog(`trusted-test: Completed`);
            return terminate();
        }
        const tnow = Date.now();
        if ( tnow >= tbye ) {
            //uboLog(`trusted-click-element: Timed out`);
            uboLog(`trusted-test: Timed out`);
            return terminate();
        }
        if ( notFound ) { observe(); }
        const delay = Math.max(notFound ? tbye - tnow : tnext - tnow, 1);
        next.timer = setTimeout(( ) => {
            next.timer = undefined;
            process();
        }, delay);
        //uboLog(`trusted-click-element: Waiting for ${selectorList[0]}...`);
        uboLog(`trusted-test: Waiting for ${selectorList[0]}...`);
    };
    next.stop = ( ) => {
        if ( next.timer === undefined ) { return; }
        clearTimeout(next.timer);
        next.timer = undefined;
    };

    const observe = ( ) => {
        if ( observe.observer !== undefined ) { return; }
        observe.observer = new MutationObserver(( ) => {
            if ( observe.timer !== undefined ) { return; }
            observe.timer = setTimeout(( ) => {
                observe.timer = undefined;
                process();
            }, 20);
        });
        observe.observer.observe(document, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    };
    observe.stop = ( ) => {
        if ( observe.timer !== undefined ) {
            clearTimeout(observe.timer);
            observe.timer = undefined;
        }
        if ( observe.observer ) {
            observe.observer.disconnect();
            observe.observer = undefined;
        }
    };

    const process = ( ) => {
        next.stop();
        if ( Date.now() < tnext ) { return next(); }
        const selector = selectorList.shift();
        if ( selector === undefined ) { return terminate(); }
        const elem = document.querySelector(selector);
        if ( elem === null ) {
            selectorList.unshift(selector);
            return next(true);
        }
        //uboLog(`trusted-click-element: Clicked ${selector}`);
        uboLog(`trusted-test: Clicked ${selector}`);
        elem.click();
        tnext += clickDelay;
        next();
    };

    runAtHtmlElementFn(process);
}

/******************************************************************************/
/******************************************************************************/

builtinScriptlets.push({
    name: 'find-project-id.js',
    requiresTrust: true,
    fn: trustedFindId,
    world: 'ISOLATED',
});
function trustedFindId() {
    window.alert('TEST');
    //return document.getElementById('project_id').value;
}

/******************************************************************************/

// window.alert('TEST');
// var ProjehtId = document.getElementById('project_id').value;
// getDeleiverablesByProjectIdandGateId(ProjehtId,'2','2');
// window.alert(ProjehtId);

/******************************************************************************/
