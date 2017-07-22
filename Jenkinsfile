
def pipeline

 

def imgVersion = IMG_VERSION

def forceDeployFO = FORCE_DEPLOY_FO == "true"
def forceDeployBO = FORCE_DEPLOY_BO == "true"

def createTag = CREATE_TAG == "true"

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
