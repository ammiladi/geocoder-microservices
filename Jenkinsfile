
def pipeline
 
 
// Build des composants
node {

    stage ('Checkout') {
        checkout scm
        //pipeline = load 'pipeline.groovy'
        //pipeline.gitInitConf();
    }
    stage ('Build') {      
            withMaven(maven: 'maven35'){
                       // Run the maven build
                       sh "mvn -Dmaven.test.skip=true clean package"
                }
            }
 

 }
