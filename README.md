
## Amazon SQS
Um serviço de enfileiramento de mensagens
O Amazon SQS fornece filas para mensagens entre sistemas de alta taxa de transferência. Você pode usar filas para desacoplar processos pesados e para armazenar em buffer e trabalhos em lote. O Amazon SQS armazena mensagens até que microsserviços e aplicativos sem servidor as processem.

### Nesse repositório há exemplos de envios de um produtor e um consumidor utilizando o serviço do SQS

<hr/>

## Producer

Uma API simples onde podemos enviar um payload do seguinte formato:
 - Dentro do campo message pode ser qualquer payload, apenas coloquei como um exemplo

```json
{
	"message": {
		"transaction_id": "ae97ae97-b110-435e-a0f1-13d865e2b584",
		"name_payment_person": "Henrique Vieira"
	}
}
```
Assym que conseguimos enviar esse payload recebemos esse objeto como resposta (basicamente o payload que o SQS retorna quando uma mensagem é criada)
```json
{
	"ResponseMetadata": {
		"RequestId": "c28e07c3-a5ac-589f-a2d9-5c904f4d1890"
	},
	"MD5OfMessageBody": "8e1cfd24357272f374e91afadd7d5cd0",
	"MessageId": "90ee9108-c9a5-4b7f-92b8-0d92748ed623"
}

```

<hr/>

## Consumer
O consumer é praticamente um listener que fica escutando de tantos em tantos segundos (com base no que foi especificado) o tópico (especificado) e recebe uma função handler (que será utilizada para o processamento da mensagem). 
Praticamente o seu funcionamento é esse, a mensagem é captada pela requisição do SQS, e este por sua vez irá verificar se existe alguma mensagem na fila, caso não tenha o processo continua escutando novas mensagens, caso tenha será utilizado a nossa função handler enviada para executar e processar a mensagem.

```ts
SQSConsumer({
    queueName: 'testQueue',
    handle: async (message: any) => {
        console.log(message);
        // Your business logic
    },
    timeout: 5000
});
```