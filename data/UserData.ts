export default interface UserData {
  data: {
    user: {
      avatarUrl: string;
      url: string;
      login: string;
      starredRepositories: {
        totalCount: Number;
        edges: {
          node: {
            id: string;
            name: string;
            resourcePath: string;
            owner: {
              login: string;
              avatarUrl: string;
              url: string;
            };
            primaryLanguage: {
              name: string;
            };
          };
        }[];
      };
    };
  };
}

// export interface Comment {
//   stringValue: string;
//   valueType: string;
// }

// export interface Language {
//   stringValue: string;
//   valueType: string;
// }

// export interface Repositoryname {
//   stringValue: string;
//   valueType: string;
// }

// export interface Url {
//   stringValue: string;
//   valueType: string;
// }

// export interface FieldsProto {
//   comment: Comment;
//   language: Language;
//   repositoryname: Repositoryname;
//   url: Url;
// }

// export interface ClientConfig {}

// export interface Settings {
//   projectId: string;
//   firebaseVersion: string;
//   libName: string;
//   libVersion: string;
//   servicePath: string;
//   port: number;
//   clientConfig: ClientConfig;
//   scopes: string[];
// }

// export interface Serializer {
//   allowUndefined: boolean;
// }

// export interface BackoffSettings {
//   initialDelayMs: number;
//   maxDelayMs: number;
//   backoffFactor: number;
// }

// export interface ActiveClients {}

// export interface Events {}

// export interface Domain {
//   domain?: any;
//   _events: Events;
//   _eventsCount: number;
//   members: any[];
// }

// export interface Promise {
//   domain: Domain;
// }

// export interface TerminateDeferred {
//   promise: Promise;
// }

// export interface ClientPool {
//   concurrentOperationLimit: number;
//   maxIdleClients: number;
//   activeClients: ActiveClients;
//   terminated: boolean;
//   terminateDeferred: TerminateDeferred;
// }

// export interface Firestore {
//   _settings: Settings;
//   _settingsFrozen: boolean;
//   _serializer: Serializer;
//   _projectId: string;
//   registeredListenersCount: number;
//   _lastSuccessfulRequest: any;
//   _backoffSettings: BackoffSettings;
//   _preferTransactions: boolean;
//   _clientPool: ClientPool;
// }

// export interface Path {
//   segments: string[];
//   projectId: string;
//   databaseId: string;
// }

// export interface Converter {}

// export interface Ref {
//   _firestore: Firestore;
//   _path: Path;
//   _converter: Converter;
// }

// export interface Serializer2 {
//   allowUndefined: boolean;
// }

// export interface ReadTime {
//   _seconds: number;
//   _nanoseconds: number;
// }

// export interface CreateTime {
//   _seconds: number;
//   _nanoseconds: number;
// }

// export interface UpdateTime {
//   _seconds: number;
//   _nanoseconds: number;
// }
