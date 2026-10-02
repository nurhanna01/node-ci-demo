pipeline {
    agent any
    parameters {
        string(name: 'SERVICE_NAME', defaultValue: 'node-ci-demo', description: 'Nama image hasil di-build')
        choice(name: 'BRANCH', choices: ['main'], description: 'Branch yang mau di-deploy')
    }
    environment {
        IMAGE_NAME = "ghcr.io/nurhanna01/${params.SERVICE_NAME}"
    }
    stages {
        stage('Build') {
            steps {
                script {
                    currentBuild.displayName = "#${env.BUILD_NUMBER} ${params.SERVICE_NAME}"
                }
                sh 'echo "============= STEP 1: BUILD IMAGE ================"'
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
                    sh 'echo "============= STEP 2: PUSH IMAGE ================"'
                    sh 'echo $PASS | docker login ghcr.io -u $USER --password-stdin'
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                echo "============= STEP 3: RUN IMAGE ================"
                docker stop node-ci-demo-running || true
                docker rm node-ci-demo-running || true
                docker pull $IMAGE_NAME:latest
                docker run -d --name node-ci-demo-running -p 3001:3000 $IMAGE_NAME:latest
                '''
            }
        }
    }
}
