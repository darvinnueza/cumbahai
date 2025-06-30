package com.bahai.community.resource;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import com.bahai.community.model.EventType;
import com.bahai.community.service.EventTypeService;
import com.bahai.community.resource.dto.ApiResponse;
import com.bahai.community.resource.dto.EventTypeRequest;
import com.bahai.community.resource.dto.ApiErrorResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/eventTypes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "EventType", description = "Operations related to EventType")
public class EventTypeResource {

    @Inject
    EventTypeService service;

    @GET
    public Response findAll() {
        try {
            List<EventType> eventTypes = service.findAll();
            ApiResponse<List<EventType>> response = new ApiResponse<>(
                    "success",
                    eventTypes,
                    "Tipo de Eventos obtenidos Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener los catálogos",
                    "EVENT_TYPES_LIST_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            EventType eventType = service.findById(id);
            if (eventType == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Tipo de Evento no encontrado",
                        "EVENT_TYPES_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }
            ApiResponse<EventType> response = new ApiResponse<>(
                    "success",
                    eventType,
                    "Tipo de Evento obtenido Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo obtener el Tipo de Evento",
                    "EVENT_TYPES_FETCH_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }



    @POST
    @Transactional
    public Response create(EventTypeRequest request) {
        try {
            EventType eventType = service.save(request);
            ApiResponse<EventType> response = new ApiResponse<>(
                    "success",
                    eventType,
                    "Tipo de Evento creado Exitosamente"
            );
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo crear el Tipo de Evento",
                    "EVENT_TYPES_CREATION_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, EventTypeRequest request) {
        try {
            EventType updatedCatalog = service.update(id, request);
            if (updatedCatalog == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Tipo de Evento no encontrado",
                        "EVENT_TYPES_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }

            ApiResponse<EventType> response = new ApiResponse<>(
                    "success",
                    updatedCatalog,
                    "Tipo de Evento actualizado Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo actualizar el Tipo de Evento",
                    "EVENT_TYPES_UPDATE_FAILED"
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
                        "Tipo de Evento no encontrado",
                        "EVENT_TYPES_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }
            ApiResponse<Void> response = new ApiResponse<>(
                    "success",
                    null,
                    "Tipo de Evento eliminado Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo eliminar el Tipo de Evento",
                    "EVENT_TYPES_DELETE_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }
}
