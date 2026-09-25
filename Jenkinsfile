pipeline {
    agent any
    environment {
        IMAGE_NAME = 'ghcr.io/nurhanna01/node-ci-demo'
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }
        stage('Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'ghcr-credentials',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'echo $PASS | docker login ghcr.io -u $USER --password-stdin'
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                docker stop node-ci-demo-running || true
                docker rm node-ci-demo-running || true
                docker pull $IMAGE_NAME:latest
                docker run -d --name node-ci-demo-running -p 3001:3000 $IMAGE_NAME:latest
                '''
            }
        }
    }
}
