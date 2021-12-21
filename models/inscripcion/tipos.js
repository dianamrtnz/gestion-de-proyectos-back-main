import pkg from 'apollo-server-express';
const { gql } = pkg;

const tiposInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto(lider: String): Proyecto
    estudiante: Usuario!
  }

  type Query {
    Inscripciones: [Inscripcion]
  }

  type Mutation {
    crearInscripcion(proyecto: String!, estudiante: String!): Inscripcion

    aprobarInscripcion(id: String!): Inscripcion
  }
`;

export { tiposInscripcion };
