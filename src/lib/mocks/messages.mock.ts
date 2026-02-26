import { Message } from '@/types/chat.types';

export const MOCK_MESSAGES: Record<string, Message[]> = {
    conv_1: [
        {
            id: 'msg_1',
            conversationId: 'conv_1',
            role: 'user',
            content: 'Tengo una query muy lenta en PostgreSQL. Hace varios JOINs y tarda 5 segundos.',
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        },
        {
            id: 'msg_2',
            conversationId: 'conv_1',
            role: 'assistant',
            content:
                'Para optimizar consultas con muchos JOINs, primero deberíamos revisar el plan de ejecución usando `EXPLAIN ANALYZE`. Dependiendo de los resultados, podríamos agregar índices o reestructurar la query.',
            createdAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
        },
        {
            id: 'msg_3',
            conversationId: 'conv_1',
            role: 'user',
            content: 'Aquí está el resultado del explain: un "Seq Scan" en la tabla principal.',
            createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        },
        {
            id: 'msg_4',
            conversationId: 'conv_1',
            role: 'assistant',
            content:
                'Un Seq Scan masivo suele ser el cuello de botella. Te recomiendo crear un índice en la columna que usas en el WHERE de esa tabla. Por ejemplo: `CREATE INDEX idx_tabla_columna ON tabla (columna);`.',
            createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        },
    ],
};
