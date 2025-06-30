package com.bahai.community.resource;

import java.util.List;


import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import com.bahai.community.model.Person;
import jakarta.transaction.Transactional;
import com.bahai.community.mapper.PersonMapper;
import com.bahai.community.service.PersonService;
import com.bahai.community.resource.dto.ApiResponse;
import com.bahai.community.resource.dto.PersonRequest;
import com.bahai.community.resource.dto.PersonResponse;
import com.bahai.community.resource.dto.ApiErrorResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Person", description = "Operations related to Persons")
public class PersonResource {

    @Inject
    PersonService service;

    @Inject
    PersonMapper mapper;

    @GET
    public Response findAll() {
        try {
            List<Person> persons = service.findAll();
            List<PersonResponse> responseList = persons.stream()
                    .map(mapper::toPersonResponse)
                    .toList();
            ApiResponse<List<PersonResponse>> response = new ApiResponse<>(
                    "success",
                    responseList,
                    "Personas obtenidas exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener la lista de Personas",
                    "PERSON_LIST_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            Person person = service.findById(id);
            if (person == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Persona no encontrada",
                        "PERSON_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }

            PersonResponse personResponse = mapper.toPersonResponse(person);

            ApiResponse<PersonResponse> response = new ApiResponse<>(
                    "success",
                    personResponse,
                    "Persona obtenida exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo obtener la persona",
                    "PERSON_FETCH_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @POST
    @Transactional
    public Response create(PersonRequest request) {
        try {
            Person person = service.save(request);
            ApiResponse<Person> response = new ApiResponse<>(
                    "success",
                    person,
                    "Persona creada Exitosamente");
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception ex) {
            ApiErrorResponse error = new ApiErrorResponse(
                    "error",
                    ex.getMessage(),
                    "PERSON_CREATION_FAILED");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, PersonRequest request) {
        try {
            Person updatedPerson = service.update(id, request);
            if (updatedPerson == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Persona no encontrada",
                        "PERSON_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }

            ApiResponse<Person> response = new ApiResponse<>(
                    "success",
                    updatedPerson,
                    "Persona actualizada exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo actualizar la Persona",
                    "PERSON_UPDATE_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        try {
            boolean deleted = service.delete(id);
            if (!deleted) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Persona no encontrada",
                        "PERSON_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }
            ApiResponse<Void> response = new ApiResponse<>(
                    "success",
                    null,
                    "Persona eliminada exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo eliminar a la Persona",
                    "PERSON_DELETE_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }
}