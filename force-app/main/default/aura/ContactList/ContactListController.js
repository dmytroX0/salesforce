({
    doInit : function(component, event, helper) {
        
        var action=component.get('c.showAccountsForAccordion');
        
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log('state ='+state);
            if (component.isValid() && state === "SUCCESS") {
               
                component.set("v.accnList", response.getReturnValue());
                console.log('v.accnList='+JSON.stringify(response.getReturnValue()));
              }
        });$A.enqueueAction(action);
        
    }
})