public with sharing class MyController {

    @AuraEnabled
    public static List<Account> showAccountsForAccordion()
    {
    List<Account> accList = [select Id,Name,Rating,Phone,(select firstname,Name,lastname from contacts)
    FROM
    Account
    Order By name LIMIT 4];
    return accList;
    }
    }