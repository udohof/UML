stateDiagram
    state "This is a state description of HR600 Workflow" as s2
    [*] --> Login
    Login --> if_backupData
        if_backupData --> StartWorkflow: false
        if_backupData --> is_networkAvailable : true  
            is_networkAvailable --> BackupToNetwork: true
            Note right of BackupToNetwork: There is still unsaved production data in the backup directory.<br/>Do you want to transfer the data to the network drive now?
            is_networkAvailable --> RemainingBackup: false
            Note right of RemainingBackup: There is production data in the backup directory that has not yet been backed up.<br/>The network drive for backing up the data is not available.<br/>The data cannot be transferred.
    StartWorkflow --> FinishWorkflow
    FinishWorkflow --> [*]
    StartWorkflow --> MesDataToNetwork
    MesDataToNetwork --> StartWorkflow
    MesDataToNetwork --> Crash
    Note up of Crash: The transfer of the packed production data export file failed.<br/>The data will be saved to a local backup directory.<br/>Please make sure that the network drive is available and access is granted.<br/>You can move the cached data to the network drive again the next time you start HRSoft2.
    Note up of Crash: The backup of the packed production data export file to the backup directory failed.<br/>Please make sure that the backup directory is available and access is granted.<br/>You may find the production data unpacked on the temporary directory TempArchiveFiles.<br/>You can also initiate a manual export from the HRSoft2 archives.<br/>If the problem persists, please contact Ersa service.
    Note up of Crash: An error occurred while generating the zip file of the production data.<br/>The generation of the production data is aborted.<br/>You can continue the process normally until the end.<br/>You can perform a manual file-based data backup to a network drive<br/>by performing an export in the archive in the archive entry just generated.<br/>If this problem persists, please contact Ersa Service.
    Note left of Crash: An error occurred while generating the CSV data.<br/>The generation of the production data is aborted.<br/>You can continue the process normally until the end.<br/>You can perform a manual file-based data backup to a network drive<br/>by performing an export in the archive in the archive entry just created.<br/>If this problem persists, please contact Ersa Service.
    Note left of Crash: An error occurred while querying the database for the last entry.<br/>The generation of the production data is aborted.<br/>You can continue the process normally until the end.<br/>You can perform a manual file-based data backup to a network drive<br/>by performing an export in the archive in the archive entry just generated.<br/>If this problem persists, please contact Ersa Service.
    MesDataToNetwork --> FinishWorkflow
    [*]
    Crash --> FinishWorkflow
    Crash --> Backup
    [*]
