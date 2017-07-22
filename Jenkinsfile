
def pipeline
 
 
// Build des composants
node {

    stage ('Checkout') {
        checkout scm
        //pipeline = load 'pipeline.groovy'
        //pipeline.gitInitConf();
    }
    stage ('Build') {  
           withEnv(["PATH+MAVEN=${tool 'maven35'}/bin"]) {    
                       // Run the maven build
                       sh "mvn -Dmaven.test.skip=true clean package"
                }
            }
 

 }
