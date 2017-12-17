import grpcService from '../services/grpc';
import kafkaService from '../services/kafka';

class MicroserviceCommunication {
  static grpc() {
    const createServer = grpcService.createServer;
    const createClient = grpcService.createClient;
    return { createServer, createClient };
  }

  static kafka() {
    const sendTopic = kafkaService.sendKafkaTopic;
    const payloadBuilder = kafkaService.kafkaPayloadBuilder;
    const producer = kafkaService.producer;
    const createTopic = kafkaService.createTopic;
    return { sendTopic, payloadBuilder, producer, createTopic };
  }
}

module.exports = MicroserviceCommunication;
