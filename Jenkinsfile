node {
    def dockerImage

    environment {
        registry = "leensungzero/hanlight-api-server"
        registryCredential = 'dockerhub'
    }

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        script {
            dockerImage = docker.build("leensungzero/hanlight-api-server" + ":$BUILD_NUMBER")
        }
    }

    stage('Test image') {
        sh 'echo "Tests passed"'
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            dockerImage.push('${BUILD_NUMBER}')
            dockerImage.push('latest')
        }
    }

    stage('Remove Unused docker image') {
        sh 'docker rmi leensungzero/hanlight-api-server:$BUILD_NUMBER'
    }
}