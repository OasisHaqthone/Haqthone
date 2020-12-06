export class Jreconstants {
    
    //pagenation related constants
    public static PAGE_SIZE =10;
    public static PAGE= "page";
    public static SIZE= "size";

    //list JRE related constants    
    public static JRE_TABLE_COLUMN =["#","JRE Name","Base Package","Download"];
    public static JRE_TABLE_COLUMN_INDEX = ["id","jrename","basepackage","location"];
    public static RETURN_TYPE="application/zip";
    public static RESPONSE_TYPE='blob';
    public static OBSERVE_TYPE="observe";
    
    //API url related constants
    public static BASE_API_URL = "//localhost:8085/jrebuilder/";
    public static GET_ALL_JRE_API_URL = "//localhost:8085/jrebuilder/getalljre";
    public static SEARCH_API_URL = "//localhost:8085/jrebuilder/search/";
    public static DOWNLOAD_API_URL = "//localhost:8085/jrebuilder/download/";
    public static BUILD_API_URL = "//localhost:8085/jrebuilder/buildjre/";
    public static GET_ALL_JREPACKAGE_API_URL = "//localhost:8085/jrebuilder/getalljrepackages";

    public static PACKAGE_ERROR = "Please select al teast one package.";
    public static DOWNLOAD_ERROR = "Unbale to create JRE.";

 
    
}


