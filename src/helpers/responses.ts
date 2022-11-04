import { Response } from "express";
import status from "http-status";

// Config

interface Args {
  res: Response;
  message: string;
  entity?: string;
  data?: any;
  error?: any;
}

export const successfulRequest = ({ res, message, entity, data }: Args) => {
  res.status(status.OK).send({
    status: true,
    message,
    entity,
    data,
  });
};

export const resourceCreated = ({ res, message, entity, data }: Args) => {
  res.status(status.CREATED).send({
    status: true,
    message,
    entity,
    data,
  });
};

export const badRequest = ({ res, message, error }: Args) => {
  res.status(status.BAD_REQUEST).send({
    status: false,
    message,
    error,
  });
};

export const notFound = ({ res, message }: Args) => {
  res.status(status.NOT_FOUND).send({
    status: false,
    message,
    data: null,
  });
};

export const notAllowed = ({ res, message, error }: Args) => {
  res.status(status.METHOD_NOT_ALLOWED).send({
    status: false,
    message,
    error,
  });
};

const response = {
  successfulRequest,
  badRequest,
  notAllowed,
  resourceCreated,
  notFound,
};

export default response;
