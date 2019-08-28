module.exports={
   "http://localhost:6363/":{
      "key":"root",
      "@context":{
         "dcog":"https://localhost/ontology/dcog#",
         "dcogbox":"https://localhost/ontology/dcogbox#",
         "doc":"http://localhost/terminus/document/",
         "ex":"http://example.org/",
         "owl":"http://www.w3.org/2002/07/owl#",
         "rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#",
         "rdfs":"http://www.w3.org/2000/01/rdf-schema#",
         "rvo":"https://localhost/ontology/rvo#",
         "scm":"http://localhost/terminus/schema/",
         "terminus":"https://localhost/ontology/terminus#",
         "xdd":"https://localhost/ontology/xdd#",
         "xsd":"http://www.w3.org/2001/XMLSchema#"
      },
      "@id":"doc:admin",
      "@type":"terminus:User",
      "rdfs:comment":{
         "@language":"en",
         "@value":"This is the server super user account"
      },
      "rdfs:label":{
         "@language":"en",
         "@value":"Server Admin User"
      },
      "doc:first_database":{
         "@id":"doc:first_database",
         "@type":"terminus:Database",
         "rdfs:comment":{
            "@language":"en",
            "@value":"First TerminusDB"
         },
         "rdfs:label":{
            "@language":"en",
            "@value":"First TerminusDB"
         },
         "terminus:allow_origin":{
            "@type":"xsd:string",
            "@value":"*"
         },
         "terminus:authority":[
            "terminus:class_frame",
            "terminus:create_database",
            "terminus:create_document"
         ]
      },
      "doc:second_database":{
         "@id":"doc:second_database",
         "@type":"terminus:Database",
         "rdfs:comment":{
            "@language":"en",
            "@value":"Second TerminusDB"
         },
         "rdfs:label":{
            "@language":"en",
            "@value":"Second TerminusDB"
         },
         "terminus:allow_origin":{
            "@type":"xsd:string",
            "@value":"*"
         },
         "terminus:authority":[
            "terminus:class_frame",
            "terminus:create_database",
            "terminus:create_document"
         ]
      },
      "doc:terminus":{
         "@id":"doc:terminus",
         "@type":"terminus:Database",
         "rdfs:comment":{
            "@language":"en",
            "@value":"The master database contains the meta-data about databases, users and roles"
         },
         "rdfs:label":{
            "@language":"en",
            "@value":"Master Database"
         },
         "terminus:allow_origin":{
            "@type":"xsd:string",
            "@value":"*"
         },
         "terminus:authority":[
            "terminus:class_frame",
            "terminus:create_database",
            "terminus:create_document"
         ]
      },
      "doc:server":{
         "@id":"doc:server",
         "@type":"terminus:Server",
         "rdfs:comment":{
            "@language":"en",
            "@value":"The current Database Server itself"
         },
         "rdfs:label":{
            "@language":"en",
            "@value":"The DB server"
         },
         "terminus:allow_origin":{
            "@type":"xsd:string",
            "@value":"*"
         },
         "terminus:resource_includes":[
            {
               "@id":"doc:first_database",
               "@type":"terminus:Database"
            },
            {
               "@id":"doc:second_database",
               "@type":"terminus:Database"
            },
            {
               "@id":"doc:terminus",
               "@type":"terminus:Database"
            }
         ],
         "terminus:authority":[
            "terminus:class_frame",
            "terminus:create_database",
            "terminus:create_document"
         ]
      }
   }
}