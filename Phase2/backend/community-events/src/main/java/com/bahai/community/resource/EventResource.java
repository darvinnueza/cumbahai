package com.bahai.community.resource;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import com.bahai.community.resource.dto.*;
import com.bahai.community.service.EventService;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/event")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Event", description = "Operations related to EventTypeDetails")
public class EventResource {

    @Inject
    EventService service;

    @GET
    @Transactional
    public Response findAll() {
        try {
            List<EventResponse> events = service.findAll();
            ApiResponse<List<EventResponse>> response = new ApiResponse<>(
                    "success",
                    events,
                    "Detalle de Eventos obtenidos Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener los Detalles de estos Eventos",
                    "EVENT_TYPE_DETAILS_LIST_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @GET
    @Path("/by-id/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            EventResponse eventTypesDetail = service.findById(id);
            if (eventTypesDetail == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Detalle del Evento no Encontrado",
                        "EVENT_TYPE_DETAIL_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }
            ApiResponse<EventResponse> response = new ApiResponse<>(
                    "success",
                    eventTypesDetail,
                    "Detalle del Evento obtenido Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo obtener el Detalle del Evento",
                    "EVENT_TYPE_DETAILS_FETCH_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @GET
    @Path("/by-type/{eventTypeId}")
    public Response findByEventTypeId(@PathParam("eventTypeId") Long eventTypeId) {
        try {
            List<EventResponse> eventTypesDetails = service.findByEventTypeId(eventTypeId);
            ApiResponse<List<EventResponse>> response = new ApiResponse<>(
                    "success",
                    eventTypesDetails,
                    "Detalle de los Eventos obtenidos Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudieron obtener los Detalles de los Eventos",
                    "EVENT_TYPE_DETAILS_LIST_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @POST
    @Transactional
    public Response create(EventRequest request) {
        try {
            EventResponse eventResponse = service.save(request);
            ApiResponse<EventResponse> response = new ApiResponse<>(
                    "success",
                    eventResponse,
                    "Detalle del Evento creado Exitosamente"
            );
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo crear el Detalle del Evento",
                    "EVENT_TYPE_DETAILS_CREATION_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, EventRequest request) {
        try {
            EventResponse eventResponse = service.update(id, request);
            if (eventResponse == null) {
                ApiErrorResponse errorResponse = new ApiErrorResponse(
                        "error",
                        "Detalle del Evento no encontrado",
                        "EVENT_TYPE_DETAILS_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }

            ApiResponse<EventResponse> response = new ApiResponse<>(
                    "success",
                    eventResponse,
                    "Detalle del Evento actualizado Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo actualizar el Detalle del Evento",
                    "EVENT_TYPE_DETAILS_UPDATE_FAILED"
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
                        "Detalle del Evento no encontrado",
                        "EVENT_TYPE_DETAILS_NOT_FOUND"
                );
                return Response.status(Response.Status.NOT_FOUND).entity(errorResponse).build();
            }
            ApiResponse<Void> response = new ApiResponse<>(
                    "success",
                    null,
                    "Detalle del Evento eliminado Exitosamente"
            );
            return Response.ok(response).build();
        } catch (Exception ex) {
            ApiErrorResponse errorResponse = new ApiErrorResponse(
                    "error",
                    "No se pudo eliminar el Detalle del Evento",
                    "EVENT_TYPE_DETAILS_DELETE_FAILED"
            );
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse).build();
        }
    }
}