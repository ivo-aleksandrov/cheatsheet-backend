pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                dir('/opt/cheatsheet/backend') {
                        git credentialsId: 'github-credentials', url: 'https://github.com/ivo-aleksandrov/cheatsheet-backend.git ', branch: 'main'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                        sh 'docker-compose -f /opt/cheatsheet/docker-compose.yml build --no-cache backend'
                }
            }
        }

        stage('Update Container') {
            steps {
                script {
                    sh 'docker-compose -f /opt/cheatsheet/docker-compose.yml up --force-recreate --no-deps -d backend'
                }
            }
        }
    }
}
